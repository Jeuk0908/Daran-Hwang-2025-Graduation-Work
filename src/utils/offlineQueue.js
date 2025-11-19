/**
 * 오프라인 이벤트 큐 관리
 *
 * WebSocket 연결이 끊어졌을 때 이벤트를 localStorage에 저장하고,
 * 연결이 복구되면 저장된 이벤트를 전송합니다.
 */

const STORAGE_KEY = 'offline_event_queue'
const MAX_QUEUE_SIZE = 1000 // 최대 저장 이벤트 수
const MAX_STORAGE_AGE = 24 * 60 * 60 * 1000 // 24시간 (밀리초)

/**
 * 오프라인 큐에 이벤트 추가
 *
 * @param {Object} event - 이벤트 데이터
 * @param {string} event.eventType - 이벤트 타입
 * @param {string} event.sessionId - 세션 ID
 * @param {Object} event.data - 이벤트 데이터
 * @returns {boolean} 추가 성공 여부
 */
export function enqueueEvent(event) {
  try {
    const queue = getQueue()

    // 큐 크기 제한 확인
    if (queue.length >= MAX_QUEUE_SIZE) {
      console.warn('[OfflineQueue] Queue is full, removing oldest event')
      queue.shift() // 가장 오래된 이벤트 제거
    }

    // 타임스탬프 추가
    const queuedEvent = {
      ...event,
      queuedAt: new Date().toISOString()
    }

    queue.push(queuedEvent)
    saveQueue(queue)

    console.log('[OfflineQueue] Event enqueued:', event.eventType, `(${queue.length} events in queue)`)
    return true

  } catch (error) {
    console.error('[OfflineQueue] Failed to enqueue event:', error)
    return false
  }
}

/**
 * 오프라인 큐에서 모든 이벤트 가져오기
 *
 * @returns {Array} 저장된 이벤트 배열
 */
export function getQueue() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []

    const queue = JSON.parse(data)

    // 오래된 이벤트 필터링
    const now = Date.now()
    const filteredQueue = queue.filter((event) => {
      const queuedTime = new Date(event.queuedAt).getTime()
      const age = now - queuedTime
      return age < MAX_STORAGE_AGE
    })

    // 필터링 후 큐가 변경되었으면 저장
    if (filteredQueue.length !== queue.length) {
      saveQueue(filteredQueue)
      console.log(`[OfflineQueue] Removed ${queue.length - filteredQueue.length} expired events`)
    }

    return filteredQueue

  } catch (error) {
    console.error('[OfflineQueue] Failed to get queue:', error)
    return []
  }
}

/**
 * 큐에 저장
 *
 * @param {Array} queue - 이벤트 큐
 */
function saveQueue(queue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
  } catch (error) {
    console.error('[OfflineQueue] Failed to save queue:', error)

    // localStorage quota 초과 시 오래된 이벤트 제거 후 재시도
    if (error.name === 'QuotaExceededError') {
      console.warn('[OfflineQueue] Storage quota exceeded, removing old events')
      const reducedQueue = queue.slice(-Math.floor(MAX_QUEUE_SIZE / 2))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedQueue))
    }
  }
}

/**
 * 큐 초기화
 *
 * @returns {number} 제거된 이벤트 수
 */
export function clearQueue() {
  try {
    const queue = getQueue()
    const count = queue.length

    localStorage.removeItem(STORAGE_KEY)
    console.log(`[OfflineQueue] Queue cleared (${count} events removed)`)

    return count

  } catch (error) {
    console.error('[OfflineQueue] Failed to clear queue:', error)
    return 0
  }
}

/**
 * 큐 크기 조회
 *
 * @returns {number} 큐에 저장된 이벤트 수
 */
export function getQueueSize() {
  return getQueue().length
}

/**
 * 큐 상태 조회
 *
 * @returns {Object} 큐 상태 정보
 */
export function getQueueStatus() {
  const queue = getQueue()

  if (queue.length === 0) {
    return {
      size: 0,
      isEmpty: true,
      isFull: false,
      oldestEventAge: null,
      newestEventAge: null
    }
  }

  const now = Date.now()
  const oldestEvent = queue[0]
  const newestEvent = queue[queue.length - 1]

  const oldestAge = now - new Date(oldestEvent.queuedAt).getTime()
  const newestAge = now - new Date(newestEvent.queuedAt).getTime()

  return {
    size: queue.length,
    isEmpty: false,
    isFull: queue.length >= MAX_QUEUE_SIZE,
    oldestEventAge: Math.floor(oldestAge / 1000), // 초 단위
    newestEventAge: Math.floor(newestAge / 1000),
    oldestEventType: oldestEvent.eventType,
    newestEventType: newestEvent.eventType
  }
}

/**
 * 큐에서 이벤트 일괄 제거
 *
 * @param {number} count - 제거할 이벤트 수
 * @returns {Array} 제거된 이벤트 배열
 */
export function dequeueEvents(count = 10) {
  try {
    const queue = getQueue()
    const dequeuedEvents = queue.splice(0, count)
    saveQueue(queue)

    console.log(`[OfflineQueue] Dequeued ${dequeuedEvents.length} events`)
    return dequeuedEvents

  } catch (error) {
    console.error('[OfflineQueue] Failed to dequeue events:', error)
    return []
  }
}

/**
 * 큐 플러시 (모든 이벤트 전송 후 초기화)
 *
 * @param {Function} sendEventFn - 이벤트 전송 함수
 * @returns {Promise<Object>} 전송 결과 { success: number, failed: number, errors: Array }
 */
export async function flushQueue(sendEventFn) {
  const queue = getQueue()

  if (queue.length === 0) {
    console.log('[OfflineQueue] Queue is empty, nothing to flush')
    return { success: 0, failed: 0, errors: [] }
  }

  console.log(`[OfflineQueue] Flushing ${queue.length} events...`)

  let successCount = 0
  let failedCount = 0
  const errors = []

  // 이벤트 전송
  for (const event of queue) {
    try {
      await sendEventFn(event)
      successCount++
    } catch (error) {
      console.error('[OfflineQueue] Failed to send event:', event.eventType, error)
      failedCount++
      errors.push({
        event,
        error: error.message
      })
    }
  }

  // 전송 성공한 이벤트 제거
  if (successCount > 0) {
    const remainingQueue = queue.slice(successCount)
    saveQueue(remainingQueue)
  }

  console.log(`[OfflineQueue] Flush complete: ${successCount} success, ${failedCount} failed`)

  return {
    success: successCount,
    failed: failedCount,
    errors
  }
}

/**
 * 온라인 상태 변화 감지 리스너
 *
 * @param {Function} onOnline - 온라인 복구 시 콜백
 * @param {Function} onOffline - 오프라인 전환 시 콜백
 * @returns {Function} 리스너 제거 함수
 */
export function setupOnlineListener(onOnline, onOffline) {
  const handleOnline = () => {
    console.log('[OfflineQueue] Network status: ONLINE')
    if (onOnline) onOnline()
  }

  const handleOffline = () => {
    console.log('[OfflineQueue] Network status: OFFLINE')
    if (onOffline) onOffline()
  }

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // 초기 상태 로그
  console.log(`[OfflineQueue] Initial network status: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`)

  // 리스너 제거 함수 반환
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

/**
 * 현재 온라인 상태 확인
 *
 * @returns {boolean} 온라인 여부
 */
export function isOnline() {
  return navigator.onLine
}
