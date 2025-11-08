/**
 * Fisher-Yates (Knuth) Shuffle Algorithm
 * 배열을 무작위로 섞는 효율적인 알고리즘
 * 시간 복잡도: O(n)
 *
 * @param {Array} array - 섞을 배열
 * @returns {Array} 섞인 새 배열 (원본 배열은 변경되지 않음)
 */
export const shuffleArray = (array) => {
  // 원본 배열을 변경하지 않기 위해 복사본 생성
  const shuffled = [...array];

  // Fisher-Yates 알고리즘
  for (let i = shuffled.length - 1; i > 0; i--) {
    // 0부터 i까지의 랜덤 인덱스 생성
    const j = Math.floor(Math.random() * (i + 1));

    // 요소 교환
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

/**
 * Seeded Random Shuffle
 * seed 값을 기반으로 일관된 랜덤 결과를 생성
 * 같은 seed 값이면 항상 같은 순서로 섞임
 *
 * @param {Array} array - 섞을 배열
 * @param {number} seed - 시드 값
 * @returns {Array} 섞인 새 배열
 */
export const seededShuffleArray = (array, seed = 1) => {
  const shuffled = [...array];

  // 간단한 seeded random 함수
  const seededRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
