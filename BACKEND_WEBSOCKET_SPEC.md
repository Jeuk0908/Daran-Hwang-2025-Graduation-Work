# Backend WebSocket Specification

## Document Overview

This document provides comprehensive specifications for implementing a WebSocket-based event tracking system for the graduation exhibition web application. The system collects real-time user interaction data during mission completion flows.

**Version**: 1.0.0
**Last Updated**: 2025-01-19
**Tech Stack**: Node.js, WebSocket, MongoDB/PostgreSQL, Server-Side Rendering (SSR)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Mission Lifecycle](#mission-lifecycle)
3. [WebSocket Communication Protocol](#websocket-communication-protocol)
4. [Data Models](#data-models)
5. [REST API Endpoints](#rest-api-endpoints)
6. [Database Schema](#database-schema)
7. [Real-time Monitoring Dashboard](#real-time-monitoring-dashboard)
8. [Implementation Guidelines](#implementation-guidelines)
9. [Security & Authentication](#security--authentication)
10. [Error Handling](#error-handling)
11. [Deployment Architecture](#deployment-architecture)

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (React App)                       │
│  ┌────────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Mission Start  │→ │  WebSocket   │→ │ Mission Complete │    │
│  │   (Trigger)    │  │ Event Stream │  │    (Trigger)     │    │
│  └────────────────┘  └──────────────┘  └──────────────────┘    │
│                            ↓                      ↓              │
│                       HTTP POST              HTTP POST          │
│                    (Review Data)         (Review Data)          │
└─────────────────────────────────────────────────────────────────┘
                            ↓                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Server (Node.js)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  WebSocket Server                         │  │
│  │  • Connection Management                                  │  │
│  │  • Event Stream Processing                                │  │
│  │  • Mission Attempt ID Generation                          │  │
│  │  • Real-time Data Validation                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    REST API Server                        │  │
│  │  • Mission Data Retrieval                                 │  │
│  │  • Review Submission                                      │  │
│  │  • Analytics Endpoints                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Server-Side Rendering (SSR)                  │  │
│  │  • Real-time Monitoring Dashboard                         │  │
│  │  • Admin Authentication                                   │  │
│  │  • Live Event Stream Visualization                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Database (MongoDB / PostgreSQL)                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ mission_attempts │  │ mission_events   │  │   reviews    │ │
│  │  • attempt_id    │  │  • event_id      │  │  • review_id │ │
│  │  • mission_type  │  │  • attempt_id    │  │  • attempt_id│ │
│  │  • session_id    │  │  • event_type    │  │  • rating    │ │
│  │  • start_time    │  │  • timestamp     │  │  • feedback  │ │
│  │  • end_time      │  │  • data          │  │  • timestamp │ │
│  │  • status        │  │                  │  │              │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **Mission Start** → Client sends HTTP POST to create mission attempt
2. **WebSocket Connection** → Client establishes WS connection with `attempt_id`
3. **Event Stream** → Client sends real-time events via WebSocket
4. **Mission End** → Client closes WebSocket on mission completion
5. **Review Submission** → Client sends HTTP POST with review data

---

## Mission Lifecycle

### Phase 1: Mission Initialization

**Trigger**: User clicks "바로 시작" button on `/mission-start` page

**Client Action**:
```javascript
// HTTP POST Request
POST /api/missions/start
Content-Type: application/json

{
  "sessionId": "uuid-v4",
  "missionType": "portfolio",  // 'portfolio' | 'vocabulary'
  "timestamp": "2025-01-19T10:30:00.000Z"
}
```

**Server Response**:
```json
{
  "attemptId": "attempt_1234567890",
  "wsUrl": "wss://your-domain.com/ws",
  "wsToken": "jwt-token-for-ws-auth",
  "expiresIn": 600  // 10 minutes
}
```

### Phase 2: WebSocket Connection

**Client Action**:
```javascript
// Establish WebSocket connection
const ws = new WebSocket(
  `wss://your-domain.com/ws?attemptId=${attemptId}&token=${wsToken}`
);

ws.onopen = () => {
  console.log('WebSocket connected');
};
```

**Server Action**:
- Validate `wsToken` and `attemptId`
- Store active connection in memory
- Update mission attempt status to `in_progress`

### Phase 3: Event Streaming

**Client sends events** (See [WebSocket Communication Protocol](#websocket-communication-protocol))

### Phase 4: Mission Completion

**Trigger**: Mission complete modal shown OR user quits mission

**Client Action**:
```javascript
// Send final event
ws.send(JSON.stringify({
  eventType: 'mission_completed',
  timestamp: new Date().toISOString(),
  sessionId: sessionId,
  data: { ... }
}));

// Close WebSocket
ws.close();
```

**Server Action**:
- Update mission attempt status to `completed` or `quitted`
- Calculate total duration
- Store final metrics

### Phase 5: Review Submission

**Trigger**: User submits rating on `/mission-rating` page

**Client Action**:
```javascript
// HTTP POST Request
POST /api/missions/{attemptId}/review
Content-Type: application/json

{
  "rating": 4,
  "ratingText": "쉬움",
  "feedback": "처음에는 어려웠지만 따라하기 쉬웠어요",
  "hasFeedback": true
}
```

**Server Response**:
```json
{
  "success": true,
  "reviewId": "review_1234567890"
}
```

---

## WebSocket Communication Protocol

### Connection URL Format

```
wss://your-domain.com/ws?attemptId={attemptId}&token={wsToken}
```

### Message Format (Client → Server)

All messages must follow this JSON structure:

```typescript
interface WebSocketMessage {
  eventType: string;           // Event type identifier
  timestamp: string;            // ISO 8601 format
  sessionId: string;            // Client session ID (UUID v4)
  attemptId: string;            // Mission attempt ID (from server)
  data: Record<string, any>;    // Event-specific data
}
```

### Supported Event Types

Based on `EVENT_TRACKING.md`, the following event types are supported:

#### Mission-Related Events (isMissionRelevant: true)

| Event Type | Description | Phase |
|------------|-------------|-------|
| `mission_started` | Mission start | Streaming |
| `page_view` | Page navigation | Streaming |
| `portfolio_creation_step` | Portfolio step completion | Streaming |
| `portfolio_created` | Portfolio saved to localStorage | Streaming |
| `vocabulary_card_clicked` | Vocabulary card clicked | Streaming |
| `vocabulary_detail_viewed` | Vocabulary modal opened | Streaming |
| `vocabulary_countdown_tick` | Countdown tick (3→2→1) | Streaming |
| `vocabulary_countdown_complete` | Countdown finished | Streaming |
| `mission_complete_modal_shown` | Mission complete modal shown | Streaming |
| `mission_rating_submitted` | Mission rating submitted | Streaming |
| `mission_completed` | Mission successfully completed | Final |
| `mission_quitted` | Mission abandoned | Final |

#### General Interaction Events (isMissionRelevant: false)

| Event Type | Description | Data Fields |
|------------|-------------|-------------|
| `button_clicked` | Button click | buttonText, variant, page, isMissionRelevant |
| `navigation_clicked` | Navigation click | navType, from, to, tabName, isMissionRelevant |
| `input_interaction` | Input field interaction | inputId, action, inputLength, page, isMissionRelevant |
| `card_clicked` | Card click | cardType, cardId, cardTitle, page, isMissionRelevant |
| `modal_interaction` | Modal open/close | modalType, action, modalId, page, isMissionRelevant |
| `search_performed` | Search execution | searchQuery, queryLength, resultCount, page, isMissionRelevant |
| `bookmark_toggled` | Bookmark add/remove | itemType, itemId, action, page, isMissionRelevant |

#### isMissionRelevant Field

All events include an `isMissionRelevant` boolean field in their `data` object:
- **`true`**: Event directly related to mission completion/abandonment
- **`false`**: General user interaction tracking event

This field enables:
- Filtering mission-specific events for completion analysis
- Analyzing overall user behavior patterns regardless of mission status
- Understanding off-mission user exploration and engagement

### Example Event Messages

#### 1. Page View
```json
{
  "eventType": "page_view",
  "timestamp": "2025-01-19T10:30:05.123Z",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "attemptId": "attempt_1737285005123",
  "data": {
    "url": "/portfolio/create/auto",
    "pageName": "AutoCreate Step 1",
    "referrer": "/portfolio/create/method",
    "timeOnPreviousPage": 5.123
  }
}
```

#### 2. Portfolio Creation Step
```json
{
  "eventType": "portfolio_creation_step",
  "timestamp": "2025-01-19T10:30:15.456Z",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "attemptId": "attempt_1737285005123",
  "data": {
    "step": 1,
    "stepName": "risk_type_selection",
    "selectedValue": "neutral",
    "selectedLabel": "중립형",
    "timeOnStep": 10.333
  }
}
```

#### 3. Mission Completed
```json
{
  "eventType": "mission_completed",
  "timestamp": "2025-01-19T10:36:30.000Z",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "attemptId": "attempt_1737285005123",
  "data": {
    "missionId": "portfolio",
    "missionName": "포트폴리오 제작 미션",
    "totalDuration": 390.0,
    "completedAt": "2025-01-19T10:36:30.000Z",
    "wasQuitted": false
  }
}
```

### Server → Client Messages

#### Connection Acknowledgment
```json
{
  "type": "connection_ack",
  "attemptId": "attempt_1737285005123",
  "timestamp": "2025-01-19T10:30:00.000Z"
}
```

#### Event Received Acknowledgment
```json
{
  "type": "event_ack",
  "eventId": "event_1737285015456",
  "timestamp": "2025-01-19T10:30:15.456Z"
}
```

#### Error Message
```json
{
  "type": "error",
  "code": "INVALID_EVENT",
  "message": "Event validation failed: missing required field 'data'",
  "timestamp": "2025-01-19T10:30:15.456Z"
}
```

---

## Data Models

### Mission Attempt Model

```typescript
interface MissionAttempt {
  // Identifiers
  attemptId: string;              // Unique attempt ID: "attempt_{timestamp}"
  sessionId: string;              // Client session ID (UUID v4)

  // Mission Info
  missionType: 'portfolio' | 'vocabulary';
  missionName: string;            // Korean display name

  // Timestamps
  startTime: Date;                // Mission start timestamp
  endTime: Date | null;           // Mission end timestamp (null if in progress)
  totalDuration: number | null;   // Duration in seconds (null if in progress)

  // Status
  status: 'pending' | 'in_progress' | 'completed' | 'quitted' | 'expired';

  // Metadata
  createdAt: Date;
  updatedAt: Date;

  // Relations
  events: MissionEvent[];         // Array of event IDs
  review: Review | null;          // Review ID (null if not submitted)
}
```

### Mission Event Model

```typescript
interface MissionEvent {
  // Identifiers
  eventId: string;                // Unique event ID: "event_{timestamp}"
  attemptId: string;              // Reference to mission attempt
  sessionId: string;              // Client session ID

  // Event Info
  eventType: string;              // Event type identifier
  timestamp: Date;                // Event timestamp

  // Event Data
  data: Record<string, any>;      // Event-specific payload

  // Metadata
  receivedAt: Date;               // Server receive timestamp
  processingTime: number;         // Processing time in ms
}
```

### Review Model

```typescript
interface Review {
  // Identifiers
  reviewId: string;               // Unique review ID: "review_{timestamp}"
  attemptId: string;              // Reference to mission attempt

  // Review Data
  rating: 1 | 2 | 3 | 4 | 5;     // Star rating
  ratingText: string;             // "아주 쉬움" | "쉬움" | "보통" | "어려움" | "아주 어려움"
  feedback: string | null;        // Optional user feedback
  hasFeedback: boolean;           // Whether feedback was provided

  // Metadata
  submittedAt: Date;
  createdAt: Date;
}
```

### Analytics Summary Model (Computed)

```typescript
interface MissionAnalytics {
  missionType: 'portfolio' | 'vocabulary';

  // Completion Stats
  totalAttempts: number;
  completedAttempts: number;
  quittedAttempts: number;
  completionRate: number;         // Percentage

  // Duration Stats
  avgDuration: number;            // Average in seconds
  minDuration: number;
  maxDuration: number;
  medianDuration: number;

  // Rating Stats
  avgRating: number;              // Average star rating
  ratingDistribution: {
    1: number,
    2: number,
    3: number,
    4: number,
    5: number
  };

  // Path Analysis (vocabulary only)
  pathStats?: {
    path1_vocabulary: number,     // Count
    path2_search: number,
    path3_etfDetail: number
  };

  // Step Analysis (portfolio only)
  stepStats?: {
    step1_completions: number,
    step2_completions: number,
    step3_completions: number,
    step4_completions: number,
    step5_completions: number,
    mostAbandoned: number         // Step number
  };

  // Timestamps
  periodStart: Date;
  periodEnd: Date;
  generatedAt: Date;
}
```

---

## REST API Endpoints

### Base URL
```
https://your-domain.com/api
```

### Authentication
All endpoints require JWT authentication unless marked as `[Public]`.

```
Authorization: Bearer {jwt_token}
```

---

### 1. Mission Management

#### 1.1 Start Mission
```http
POST /api/missions/start
Content-Type: application/json

Request Body:
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "missionType": "portfolio",
  "timestamp": "2025-01-19T10:30:00.000Z"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "attemptId": "attempt_1737285000000",
    "wsUrl": "wss://your-domain.com/ws",
    "wsToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 600
  }
}
```

#### 1.2 Get Mission Attempt
```http
GET /api/missions/{attemptId}

Response: 200 OK
{
  "success": true,
  "data": {
    "attemptId": "attempt_1737285000000",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "missionType": "portfolio",
    "missionName": "포트폴리오 제작 미션",
    "status": "completed",
    "startTime": "2025-01-19T10:30:00.000Z",
    "endTime": "2025-01-19T10:36:30.000Z",
    "totalDuration": 390.0,
    "eventCount": 45,
    "review": {
      "reviewId": "review_1737285390000",
      "rating": 4,
      "ratingText": "쉬움",
      "feedback": "처음에는 어려웠지만 따라하기 쉬웠어요"
    }
  }
}
```

#### 1.3 List Mission Attempts (with filters)
```http
GET /api/missions?missionType={type}&status={status}&limit={limit}&offset={offset}

Query Parameters:
- missionType: 'portfolio' | 'vocabulary' | 'all' (default: 'all')
- status: 'pending' | 'in_progress' | 'completed' | 'quitted' | 'all' (default: 'all')
- sortBy: 'startTime' | 'duration' | 'rating' (default: 'startTime')
- order: 'asc' | 'desc' (default: 'desc')
- limit: number (default: 20, max: 100)
- offset: number (default: 0)

Response: 200 OK
{
  "success": true,
  "data": {
    "attempts": [
      {
        "attemptId": "attempt_1737285000000",
        "sessionId": "550e8400-e29b-41d4-a716-446655440000",
        "missionType": "portfolio",
        "status": "completed",
        "startTime": "2025-01-19T10:30:00.000Z",
        "totalDuration": 390.0,
        "rating": 4
      },
      // ... more attempts
    ],
    "pagination": {
      "total": 150,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

---

### 2. Event Management

#### 2.1 Get Events for Attempt
```http
GET /api/missions/{attemptId}/events

Response: 200 OK
{
  "success": true,
  "data": {
    "attemptId": "attempt_1737285000000",
    "eventCount": 45,
    "events": [
      {
        "eventId": "event_1737285005123",
        "eventType": "page_view",
        "timestamp": "2025-01-19T10:30:05.123Z",
        "data": {
          "url": "/portfolio/create/auto",
          "pageName": "AutoCreate Step 1"
        }
      },
      // ... more events
    ]
  }
}
```

#### 2.2 Get Events by Type
```http
GET /api/missions/{attemptId}/events?type={eventType}

Query Parameters:
- type: Event type filter (e.g., 'page_view', 'portfolio_creation_step')

Response: 200 OK
{
  "success": true,
  "data": {
    "attemptId": "attempt_1737285000000",
    "eventType": "portfolio_creation_step",
    "eventCount": 5,
    "events": [ ... ]
  }
}
```

---

### 3. Review Management

#### 3.1 Submit Review
```http
POST /api/missions/{attemptId}/review
Content-Type: application/json

Request Body:
{
  "rating": 4,
  "ratingText": "쉬움",
  "feedback": "처음에는 어려웠지만 따라하기 쉬웠어요",
  "hasFeedback": true
}

Response: 201 Created
{
  "success": true,
  "data": {
    "reviewId": "review_1737285390000",
    "attemptId": "attempt_1737285000000",
    "rating": 4,
    "submittedAt": "2025-01-19T10:36:30.000Z"
  }
}
```

#### 3.2 Get Review
```http
GET /api/missions/{attemptId}/review

Response: 200 OK
{
  "success": true,
  "data": {
    "reviewId": "review_1737285390000",
    "attemptId": "attempt_1737285000000",
    "rating": 4,
    "ratingText": "쉬움",
    "feedback": "처음에는 어려웠지만 따라하기 쉬웠어요",
    "hasFeedback": true,
    "submittedAt": "2025-01-19T10:36:30.000Z"
  }
}
```

---

### 4. Analytics Endpoints

#### 4.1 Get Mission Analytics
```http
GET /api/analytics/missions/{missionType}

Path Parameters:
- missionType: 'portfolio' | 'vocabulary' | 'all'

Query Parameters:
- startDate: ISO date (default: 7 days ago)
- endDate: ISO date (default: now)

Response: 200 OK
{
  "success": true,
  "data": {
    "missionType": "portfolio",
    "totalAttempts": 150,
    "completedAttempts": 120,
    "quittedAttempts": 30,
    "completionRate": 80.0,
    "avgDuration": 85.5,
    "minDuration": 60.2,
    "maxDuration": 150.8,
    "medianDuration": 82.3,
    "avgRating": 3.8,
    "ratingDistribution": {
      "1": 5,
      "2": 10,
      "3": 25,
      "4": 50,
      "5": 30
    },
    "stepStats": {
      "step1_completions": 150,
      "step2_completions": 145,
      "step3_completions": 130,
      "step4_completions": 125,
      "step5_completions": 120,
      "mostAbandoned": 3
    },
    "periodStart": "2025-01-12T00:00:00.000Z",
    "periodEnd": "2025-01-19T23:59:59.999Z",
    "generatedAt": "2025-01-19T10:40:00.000Z"
  }
}
```

#### 4.2 Get Path Analysis (Vocabulary Mission Only)
```http
GET /api/analytics/vocabulary/paths

Response: 200 OK
{
  "success": true,
  "data": {
    "totalCompletions": 80,
    "pathStats": {
      "path1_vocabulary": 30,      // 37.5%
      "path2_search": 45,           // 56.25% (fastest)
      "path3_etfDetail": 5          // 6.25%
    },
    "avgDurationByPath": {
      "path1_vocabulary": 18.5,
      "path2_search": 12.3,
      "path3_etfDetail": 19.8
    }
  }
}
```

#### 4.3 Get Real-time Stats
```http
GET /api/analytics/realtime

Response: 200 OK
{
  "success": true,
  "data": {
    "activeConnections": 5,
    "inProgressAttempts": 3,
    "completedToday": 25,
    "quittedToday": 5,
    "currentLoad": "low",          // 'low' | 'medium' | 'high'
    "timestamp": "2025-01-19T10:40:00.000Z"
  }
}
```

---

### 5. Admin Endpoints

#### 5.1 Export Data
```http
GET /api/admin/export?format={format}&missionType={type}&startDate={start}&endDate={end}

Query Parameters:
- format: 'json' | 'csv' (default: 'json')
- missionType: 'portfolio' | 'vocabulary' | 'all' (default: 'all')
- startDate: ISO date (optional)
- endDate: ISO date (optional)

Response: 200 OK
Content-Type: application/json | text/csv
Content-Disposition: attachment; filename="mission_data_2025-01-19.json"

{
  "exportedAt": "2025-01-19T10:40:00.000Z",
  "recordCount": 150,
  "data": [ ... ]
}
```

---

## Database Schema

### Choice: MongoDB (Recommended) or PostgreSQL

**Recommendation: MongoDB**
- Better for flexible event data structures
- High write throughput for real-time events
- Easy horizontal scaling
- Native JSON support

### MongoDB Collections

#### 1. `mission_attempts` Collection

```javascript
{
  _id: ObjectId("..."),
  attemptId: "attempt_1737285000000",         // Indexed, Unique
  sessionId: "550e8400-e29b-41d4-a716-446655440000",

  missionType: "portfolio",                   // Indexed
  missionName: "포트폴리오 제작 미션",

  startTime: ISODate("2025-01-19T10:30:00.000Z"),
  endTime: ISODate("2025-01-19T10:36:30.000Z"),
  totalDuration: 390.0,

  status: "completed",                        // Indexed

  createdAt: ISODate("2025-01-19T10:30:00.000Z"),
  updatedAt: ISODate("2025-01-19T10:36:30.000Z"),

  // Embedded review data
  review: {
    reviewId: "review_1737285390000",
    rating: 4,
    ratingText: "쉬움",
    feedback: "처음에는 어려웠지만 따라하기 쉬웠어요",
    hasFeedback: true,
    submittedAt: ISODate("2025-01-19T10:36:30.000Z")
  }
}
```

**Indexes**:
```javascript
db.mission_attempts.createIndex({ attemptId: 1 }, { unique: true });
db.mission_attempts.createIndex({ sessionId: 1 });
db.mission_attempts.createIndex({ missionType: 1 });
db.mission_attempts.createIndex({ status: 1 });
db.mission_attempts.createIndex({ startTime: -1 });
db.mission_attempts.createIndex({ "review.rating": 1 });
```

#### 2. `mission_events` Collection

```javascript
{
  _id: ObjectId("..."),
  eventId: "event_1737285005123",             // Indexed, Unique
  attemptId: "attempt_1737285000000",         // Indexed (Foreign Key)
  sessionId: "550e8400-e29b-41d4-a716-446655440000",

  eventType: "page_view",                     // Indexed
  timestamp: ISODate("2025-01-19T10:30:05.123Z"),

  data: {                                     // Flexible schema
    url: "/portfolio/create/auto",
    pageName: "AutoCreate Step 1",
    referrer: "/portfolio/create/method",
    timeOnPreviousPage: 5.123
  },

  receivedAt: ISODate("2025-01-19T10:30:05.456Z"),
  processingTime: 333                         // milliseconds
}
```

**Indexes**:
```javascript
db.mission_events.createIndex({ eventId: 1 }, { unique: true });
db.mission_events.createIndex({ attemptId: 1 });
db.mission_events.createIndex({ eventType: 1 });
db.mission_events.createIndex({ timestamp: -1 });
db.mission_events.createIndex({ attemptId: 1, timestamp: 1 });
```

#### 3. `websocket_connections` Collection (In-Memory Cache)

```javascript
{
  _id: ObjectId("..."),
  attemptId: "attempt_1737285000000",
  sessionId: "550e8400-e29b-41d4-a716-446655440000",

  connectionId: "conn_1737285000000",
  wsToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

  connectedAt: ISODate("2025-01-19T10:30:00.000Z"),
  lastHeartbeat: ISODate("2025-01-19T10:35:00.000Z"),

  status: "active",                           // 'active' | 'disconnected'

  // TTL index - auto-delete after 1 hour
  expiresAt: ISODate("2025-01-19T11:30:00.000Z")
}
```

**Indexes**:
```javascript
db.websocket_connections.createIndex({ attemptId: 1 }, { unique: true });
db.websocket_connections.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

### PostgreSQL Alternative Schema

```sql
-- mission_attempts table
CREATE TABLE mission_attempts (
  id SERIAL PRIMARY KEY,
  attempt_id VARCHAR(50) UNIQUE NOT NULL,
  session_id UUID NOT NULL,

  mission_type VARCHAR(20) NOT NULL,
  mission_name VARCHAR(100) NOT NULL,

  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  total_duration NUMERIC(10, 3),

  status VARCHAR(20) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempt_mission_type ON mission_attempts(mission_type);
CREATE INDEX idx_attempt_status ON mission_attempts(status);
CREATE INDEX idx_attempt_start_time ON mission_attempts(start_time DESC);

-- mission_events table
CREATE TABLE mission_events (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR(50) UNIQUE NOT NULL,
  attempt_id VARCHAR(50) NOT NULL REFERENCES mission_attempts(attempt_id),
  session_id UUID NOT NULL,

  event_type VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  data JSONB NOT NULL,

  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processing_time INTEGER
);

CREATE INDEX idx_event_attempt_id ON mission_events(attempt_id);
CREATE INDEX idx_event_type ON mission_events(event_type);
CREATE INDEX idx_event_timestamp ON mission_events(timestamp DESC);

-- reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  review_id VARCHAR(50) UNIQUE NOT NULL,
  attempt_id VARCHAR(50) NOT NULL REFERENCES mission_attempts(attempt_id),

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  rating_text VARCHAR(20) NOT NULL,
  feedback TEXT,
  has_feedback BOOLEAN NOT NULL,

  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_review_attempt_id ON reviews(attempt_id);
CREATE INDEX idx_review_rating ON reviews(rating);
```

---

## Real-time Monitoring Dashboard

### Overview

A server-side rendered (SSR) admin dashboard for real-time monitoring of mission attempts and events.

### Tech Stack Options

1. **Next.js** (Recommended)
   - Server-side rendering
   - Real-time updates via WebSocket
   - Easy deployment

2. **Express + EJS/Pug**
   - Lightweight
   - Simple server rendering
   - Socket.IO integration

3. **SvelteKit**
   - Modern SSR framework
   - Reactive UI
   - Excellent performance

### Dashboard Features

#### 1. Real-time Overview Panel

```
┌─────────────────────────────────────────────────────────────┐
│                  Mission Monitoring Dashboard                │
├─────────────────────────────────────────────────────────────┤
│  Active Connections: 5     In Progress: 3     Today: 25     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                               │
│  Portfolio Mission          Vocabulary Mission               │
│  ┌───────────────────┐     ┌───────────────────┐           │
│  │ Completed: 15     │     │ Completed: 10     │           │
│  │ Quit: 2           │     │ Quit: 1           │           │
│  │ Avg Time: 85s     │     │ Avg Time: 14s     │           │
│  │ Avg Rating: 3.8★  │     │ Avg Rating: 4.2★  │           │
│  └───────────────────┘     └───────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

#### 2. Live Event Stream

```
┌─────────────────────────────────────────────────────────────┐
│                      Live Event Stream                       │
├─────────────────────────────────────────────────────────────┤
│  🟢 10:35:45 | attempt_xxx | portfolio_creation_step       │
│     → Step 3 completed in 12.5s                             │
│                                                               │
│  🟢 10:35:40 | attempt_yyy | vocabulary_card_clicked        │
│     → Card "ETF" clicked on path 2                          │
│                                                               │
│  🔴 10:35:30 | attempt_zzz | mission_quitted                │
│     → Quit at step 2 after 45s                              │
└─────────────────────────────────────────────────────────────┘
```

#### 3. Mission Detail View

Click on any attempt to see detailed event timeline:

```
┌─────────────────────────────────────────────────────────────┐
│  Attempt: attempt_1737285000000                              │
│  Type: Portfolio Mission                                     │
│  Status: ✅ Completed                                        │
│  Duration: 390.0s (6m 30s)                                   │
│  Rating: 4★ (쉬움)                                           │
├─────────────────────────────────────────────────────────────┤
│  Event Timeline                                              │
│  ├─ 10:30:00 | mission_started                             │
│  ├─ 10:30:05 | page_view → /portfolio/create/auto          │
│  ├─ 10:30:15 | portfolio_creation_step → Step 1 (10.3s)    │
│  ├─ 10:30:25 | portfolio_creation_step → Step 2 (8.5s)     │
│  ├─ 10:31:45 | portfolio_creation_step → Step 3 (35.4s)    │
│  ├─ 10:32:30 | portfolio_creation_step → Step 4 (15.2s)    │
│  ├─ 10:33:00 | portfolio_creation_step → Step 5 (8.1s)     │
│  ├─ 10:33:05 | portfolio_created                           │
│  ├─ 10:33:05 | mission_complete_modal_shown                │
│  ├─ 10:36:00 | mission_rating_submitted (rating: 4)        │
│  └─ 10:36:30 | mission_completed                           │
└─────────────────────────────────────────────────────────────┘
```

#### 4. Analytics Charts

- **Completion Rate Over Time** (Line chart)
- **Average Duration by Mission Type** (Bar chart)
- **Rating Distribution** (Pie chart)
- **Most Abandoned Steps** (Bar chart)
- **Path Usage (Vocabulary)** (Pie chart)

### Dashboard Routes

```
/admin/login                 → Admin login page
/admin/dashboard             → Main overview dashboard
/admin/missions/live         → Live event stream
/admin/missions/portfolio    → Portfolio mission analytics
/admin/missions/vocabulary   → Vocabulary mission analytics
/admin/attempts/{attemptId}  → Attempt detail view
/admin/export                → Data export page
```

### Authentication

**Admin credentials** stored securely with bcrypt:

```javascript
// Example: Express middleware
const adminAuth = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.redirect('/admin/login');
  }
  next();
};

app.use('/admin/dashboard', adminAuth);
```

### WebSocket Integration (Dashboard)

```javascript
// Server-side (Socket.IO)
io.on('connection', (socket) => {
  // Admin joins monitoring room
  if (socket.handshake.query.isAdmin === 'true') {
    socket.join('admin_monitor');
  }
});

// Broadcast events to admin dashboard
const broadcastToAdmin = (eventData) => {
  io.to('admin_monitor').emit('mission_event', eventData);
};
```

---

## Implementation Guidelines

### Backend Server Setup (Node.js + Express + ws)

#### 1. Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   ├── websocket.js          # WebSocket config
│   │   └── constants.js          # Constants & env vars
│   ├── models/
│   │   ├── MissionAttempt.js     # Mongoose model
│   │   ├── MissionEvent.js       # Mongoose model
│   │   └── Review.js             # Mongoose model
│   ├── controllers/
│   │   ├── missionController.js  # Mission CRUD
│   │   ├── eventController.js    # Event retrieval
│   │   ├── reviewController.js   # Review submission
│   │   └── analyticsController.js# Analytics
│   ├── services/
│   │   ├── websocketService.js   # WS connection mgmt
│   │   ├── eventProcessor.js     # Event validation
│   │   └── analyticsService.js   # Compute analytics
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── validation.js         # Request validation
│   │   └── errorHandler.js       # Error handling
│   ├── routes/
│   │   ├── missions.js           # /api/missions routes
│   │   ├── analytics.js          # /api/analytics routes
│   │   └── admin.js              # /api/admin routes
│   ├── dashboard/
│   │   ├── views/                # EJS/Pug templates
│   │   ├── public/               # Static assets
│   │   └── dashboardServer.js    # SSR server
│   ├── utils/
│   │   ├── idGenerator.js        # Generate attempt/event IDs
│   │   ├── validators.js         # Schema validators
│   │   └── logger.js             # Winston logger
│   └── app.js                    # Express app entry
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── package.json
└── README.md
```

#### 2. Environment Variables (.env)

```bash
# Server
NODE_ENV=production
PORT=3000
WS_PORT=3001

# Database
MONGODB_URI=mongodb://localhost:27017/mission_tracking
# or
POSTGRES_URI=postgresql://user:pass@localhost:5432/mission_tracking

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
WS_TOKEN_EXPIRES_IN=600  # 10 minutes

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$...  # bcrypt hash

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com,http://localhost:5173

# Monitoring
LOG_LEVEL=info
ENABLE_METRICS=true
```

#### 3. WebSocket Server Implementation

```javascript
// src/services/websocketService.js
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const MissionAttempt = require('../models/MissionAttempt');
const MissionEvent = require('../models/MissionEvent');

class WebSocketService {
  constructor() {
    this.wss = null;
    this.connections = new Map(); // attemptId → WebSocket
  }

  initialize(server) {
    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', async (ws, req) => {
      try {
        // Parse query params
        const url = new URL(req.url, `ws://${req.headers.host}`);
        const attemptId = url.searchParams.get('attemptId');
        const token = url.searchParams.get('token');

        // Validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.attemptId !== attemptId) {
          throw new Error('Invalid token');
        }

        // Update mission attempt status
        await MissionAttempt.updateOne(
          { attemptId },
          { status: 'in_progress', updatedAt: new Date() }
        );

        // Store connection
        this.connections.set(attemptId, ws);

        // Send acknowledgment
        ws.send(JSON.stringify({
          type: 'connection_ack',
          attemptId,
          timestamp: new Date().toISOString()
        }));

        // Handle messages
        ws.on('message', async (data) => {
          await this.handleMessage(attemptId, data);
        });

        // Handle disconnect
        ws.on('close', async () => {
          await this.handleDisconnect(attemptId);
          this.connections.delete(attemptId);
        });

      } catch (error) {
        ws.send(JSON.stringify({
          type: 'error',
          code: 'AUTH_FAILED',
          message: error.message
        }));
        ws.close();
      }
    });
  }

  async handleMessage(attemptId, data) {
    try {
      const event = JSON.parse(data);

      // Validate event structure
      if (!event.eventType || !event.timestamp || !event.data) {
        throw new Error('Invalid event format');
      }

      // Generate event ID
      const eventId = `event_${Date.now()}`;

      // Save to database
      await MissionEvent.create({
        eventId,
        attemptId,
        sessionId: event.sessionId,
        eventType: event.eventType,
        timestamp: new Date(event.timestamp),
        data: event.data,
        receivedAt: new Date(),
        processingTime: Date.now() - new Date(event.timestamp).getTime()
      });

      // Send acknowledgment
      const ws = this.connections.get(attemptId);
      if (ws) {
        ws.send(JSON.stringify({
          type: 'event_ack',
          eventId,
          timestamp: new Date().toISOString()
        }));
      }

      // Handle final events
      if (event.eventType === 'mission_completed' || event.eventType === 'mission_quitted') {
        await this.handleMissionEnd(attemptId, event);
      }

      // Broadcast to admin dashboard
      this.broadcastToAdmin({
        attemptId,
        eventType: event.eventType,
        timestamp: event.timestamp,
        data: event.data
      });

    } catch (error) {
      console.error('Error handling message:', error);
      const ws = this.connections.get(attemptId);
      if (ws) {
        ws.send(JSON.stringify({
          type: 'error',
          code: 'PROCESSING_ERROR',
          message: error.message
        }));
      }
    }
  }

  async handleMissionEnd(attemptId, event) {
    const endTime = new Date(event.timestamp);
    const attempt = await MissionAttempt.findOne({ attemptId });

    const totalDuration = (endTime - attempt.startTime) / 1000; // seconds

    await MissionAttempt.updateOne(
      { attemptId },
      {
        status: event.eventType === 'mission_completed' ? 'completed' : 'quitted',
        endTime,
        totalDuration,
        updatedAt: new Date()
      }
    );
  }

  async handleDisconnect(attemptId) {
    console.log(`WebSocket disconnected: ${attemptId}`);
  }

  broadcastToAdmin(eventData) {
    // Implement Socket.IO broadcast to admin dashboard
    // io.to('admin_monitor').emit('mission_event', eventData);
  }
}

module.exports = new WebSocketService();
```

#### 4. Mission Controller

```javascript
// src/controllers/missionController.js
const MissionAttempt = require('../models/MissionAttempt');
const jwt = require('jsonwebtoken');

exports.startMission = async (req, res) => {
  try {
    const { sessionId, missionType, timestamp } = req.body;

    // Generate attempt ID
    const attemptId = `attempt_${Date.now()}`;

    // Mission name mapping
    const missionNames = {
      portfolio: '포트폴리오 제작 미션',
      vocabulary: '단어카드 열람 미션'
    };

    // Create mission attempt
    await MissionAttempt.create({
      attemptId,
      sessionId,
      missionType,
      missionName: missionNames[missionType],
      startTime: new Date(timestamp),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Generate WebSocket token
    const wsToken = jwt.sign(
      { attemptId, sessionId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.WS_TOKEN_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      data: {
        attemptId,
        wsUrl: process.env.WS_URL || 'wss://your-domain.com/ws',
        wsToken,
        expiresIn: parseInt(process.env.WS_TOKEN_EXPIRES_IN)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getMissionAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await MissionAttempt.findOne({ attemptId }).lean();
    if (!attempt) {
      return res.status(404).json({
        success: false,
        error: 'Mission attempt not found'
      });
    }

    // Get event count
    const eventCount = await MissionEvent.countDocuments({ attemptId });

    res.json({
      success: true,
      data: {
        ...attempt,
        eventCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.listMissionAttempts = async (req, res) => {
  try {
    const {
      missionType = 'all',
      status = 'all',
      sortBy = 'startTime',
      order = 'desc',
      limit = 20,
      offset = 0
    } = req.query;

    // Build query
    const query = {};
    if (missionType !== 'all') query.missionType = missionType;
    if (status !== 'all') query.status = status;

    // Build sort
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };

    // Execute query
    const attempts = await MissionAttempt.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .lean();

    const total = await MissionAttempt.countDocuments(query);

    res.json({
      success: true,
      data: {
        attempts,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: offset + limit < total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

---

## Security & Authentication

### 1. WebSocket Authentication

```javascript
// JWT token generation for WebSocket
const generateWSToken = (attemptId, sessionId) => {
  return jwt.sign(
    {
      attemptId,
      sessionId,
      type: 'ws_auth'
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }  // Short-lived token
  );
};

// Token validation on WS connection
const validateWSToken = (token, attemptId) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.attemptId === attemptId && decoded.type === 'ws_auth';
  } catch (error) {
    return false;
  }
};
```

### 2. Rate Limiting

```javascript
// Install: npm install express-rate-limit
const rateLimit = require('express-rate-limit');

// API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', apiLimiter);

// WebSocket connection rate limiter
const wsLimiter = rateLimit({
  windowMs: 60 * 1000,        // 1 minute
  max: 10,                    // Max 10 connections per minute per IP
  skipSuccessfulRequests: true
});
```

### 3. Input Validation

```javascript
// Install: npm install joi
const Joi = require('joi');

// Event validation schema
const eventSchema = Joi.object({
  eventType: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
  sessionId: Joi.string().uuid().required(),
  attemptId: Joi.string().pattern(/^attempt_\d+$/).required(),
  data: Joi.object().required()
});

// Validate incoming event
const validateEvent = (event) => {
  const { error, value } = eventSchema.validate(event);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
};
```

### 4. CORS Configuration

```javascript
// Install: npm install cors
const cors = require('cors');

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### 5. Admin Authentication

```javascript
// Install: npm install bcrypt express-session
const bcrypt = require('bcrypt');
const session = require('express-session');

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  }
}));

// Admin login
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME) {
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (match) {
      req.session.isAdmin = true;
      return res.redirect('/admin/dashboard');
    }
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// Admin auth middleware
const requireAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(403).redirect('/admin/login');
  }
  next();
};

app.use('/admin/dashboard', requireAdmin);
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid event format: missing required field 'data'",
    "details": {
      "field": "data",
      "expected": "object"
    },
    "timestamp": "2025-01-19T10:40:00.000Z"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `AUTH_FAILED` | 401 | Authentication failed |
| `FORBIDDEN` | 403 | Access denied |
| `NOT_FOUND` | 404 | Resource not found |
| `ATTEMPT_EXPIRED` | 410 | Mission attempt expired |
| `RATE_LIMIT` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `DATABASE_ERROR` | 500 | Database operation failed |
| `WS_ERROR` | 500 | WebSocket error |

### Global Error Handler

```javascript
// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: err.message,
      details: err.details || null,
      timestamp: new Date().toISOString()
    }
  });
};
```

---

## Deployment Architecture

### Recommended Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                        Load Balancer                         │
│                     (NGINX / AWS ALB)                        │
└────────────────┬────────────────────────┬───────────────────┘
                 │                        │
       ┌─────────▼─────────┐    ┌────────▼──────────┐
       │   API Server 1    │    │   API Server 2    │
       │  (Node.js + WS)   │    │  (Node.js + WS)   │
       └─────────┬─────────┘    └────────┬──────────┘
                 │                        │
                 └───────────┬────────────┘
                             │
                   ┌─────────▼──────────┐
                   │   Redis Cluster    │
                   │  (Session Store)   │
                   └─────────┬──────────┘
                             │
                   ┌─────────▼──────────┐
                   │  MongoDB Replica   │
                   │       Set          │
                   │  (Primary + 2x)    │
                   └────────────────────┘
```

### Environment-Specific Configurations

#### Development
```bash
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mission_tracking_dev
LOG_LEVEL=debug
ENABLE_CORS=true
```

#### Staging
```bash
NODE_ENV=staging
MONGODB_URI=mongodb://staging-db:27017/mission_tracking
LOG_LEVEL=info
ENABLE_METRICS=true
```

#### Production
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://prod-cluster/mission_tracking?retryWrites=true
LOG_LEVEL=warn
ENABLE_METRICS=true
REDIS_URL=redis://prod-redis:6379
```

### Scaling Considerations

1. **Horizontal Scaling**
   - Run multiple API server instances
   - Use Redis for session sharing
   - Sticky sessions for WebSocket connections

2. **Database Scaling**
   - MongoDB replica set (1 primary + 2 secondaries)
   - Read from secondaries for analytics
   - Sharding for large datasets

3. **WebSocket Sticky Sessions**
   ```nginx
   # NGINX configuration
   upstream websocket {
     ip_hash;  # Sticky sessions based on client IP
     server api-server-1:3001;
     server api-server-2:3001;
   }

   server {
     location /ws {
       proxy_pass http://websocket;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
     }
   }
   ```

---

## Performance Optimization

### 1. Database Indexing

Ensure proper indexes are created (see [Database Schema](#database-schema))

### 2. Connection Pooling

```javascript
// MongoDB connection pooling
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});
```

### 3. Event Batching (Optional)

For high-traffic scenarios, batch insert events:

```javascript
const eventBuffer = [];
const BATCH_SIZE = 50;
const BATCH_INTERVAL = 1000;  // 1 second

const flushEventBuffer = async () => {
  if (eventBuffer.length > 0) {
    await MissionEvent.insertMany(eventBuffer);
    eventBuffer.length = 0;
  }
};

setInterval(flushEventBuffer, BATCH_INTERVAL);
```

### 4. Caching

```javascript
// Install: npm install node-cache
const NodeCache = require('node-cache');
const analyticsCache = new NodeCache({ stdTTL: 300 });  // 5 minutes

// Cache analytics results
exports.getAnalytics = async (req, res) => {
  const cacheKey = `analytics_${missionType}_${startDate}_${endDate}`;

  let data = analyticsCache.get(cacheKey);
  if (!data) {
    data = await computeAnalytics(missionType, startDate, endDate);
    analyticsCache.set(cacheKey, data);
  }

  res.json({ success: true, data });
};
```

---

## Monitoring & Logging

### 1. Logging with Winston

```javascript
// Install: npm install winston
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

### 2. Health Check Endpoint

```javascript
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'disconnected',
    websocket: 'active'
  };

  try {
    await mongoose.connection.db.admin().ping();
    health.database = 'connected';
  } catch (error) {
    health.status = 'degraded';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

### 3. Metrics (Optional - Prometheus)

```javascript
// Install: npm install prom-client
const promClient = require('prom-client');

const register = new promClient.Registry();

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

---

## Testing

### Unit Tests

```javascript
// Install: npm install jest supertest
// tests/unit/missionController.test.js
const request = require('supertest');
const app = require('../src/app');

describe('POST /api/missions/start', () => {
  it('should create a new mission attempt', async () => {
    const response = await request(app)
      .post('/api/missions/start')
      .send({
        sessionId: '550e8400-e29b-41d4-a716-446655440000',
        missionType: 'portfolio',
        timestamp: new Date().toISOString()
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.attemptId).toMatch(/^attempt_\d+$/);
  });
});
```

### Integration Tests

```javascript
// tests/integration/websocket.test.js
const WebSocket = require('ws');

describe('WebSocket Connection', () => {
  let ws;

  beforeAll(async () => {
    // Create mission attempt
    const response = await request(app)
      .post('/api/missions/start')
      .send({ ... });

    const { attemptId, wsToken } = response.body.data;

    // Connect to WebSocket
    ws = new WebSocket(`ws://localhost:3001/ws?attemptId=${attemptId}&token=${wsToken}`);

    await new Promise(resolve => ws.on('open', resolve));
  });

  it('should receive connection acknowledgment', (done) => {
    ws.on('message', (data) => {
      const message = JSON.parse(data);
      expect(message.type).toBe('connection_ack');
      done();
    });
  });

  afterAll(() => {
    ws.close();
  });
});
```

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database indexes created
- [ ] HTTPS/WSS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Admin credentials set
- [ ] Logging configured
- [ ] Health check endpoint working
- [ ] Backup strategy implemented
- [ ] Monitoring dashboard deployed
- [ ] Load balancer configured
- [ ] SSL certificates installed
- [ ] Firewall rules set
- [ ] Documentation updated

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1.0 | 2025-01-19 | Added general interaction events (7 new event types) and isMissionRelevant field |
| 1.0.0 | 2025-01-19 | Initial specification |

---

## Contact & Support

For questions or issues related to this specification:
- **Email**: backend-team@example.com
- **GitHub**: https://github.com/your-org/mission-tracking-backend
- **Slack**: #backend-support
