<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#eff6ff] to-[#f9fafb] text-[#111827] antialiased selection:bg-blue-100 selection:text-blue-700"
  >
    <NuxtRouteAnnouncer />
    <!-- App Container -->
    <div class="max-w-screen-md mx-auto px-4 py-10">
      <!-- Header -->
      <header
        class="mb-8 text-center"
      >
        <h1 class="text-3xl sm:text-4xl font-semibold text-[#2563EB] tracking-tight">
          Tic Tac Toe
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Classic local 2‑player. Clean, minimal, and smooth to play.
        </p>
      </header>

      <!-- Card Surface -->
      <section
        class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 sm:p-6"
      >
        <!-- Scoreboard and Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Scoreboard -->
          <div
            class="grid grid-cols-3 divide-x divide-gray-200 rounded-lg overflow-hidden border border-gray-100"
          >
            <div class="px-4 py-2 text-center">
              <div class="text-xs uppercase tracking-wide text-gray-500">Player X</div>
              <div class="text-2xl font-semibold text-[#2563EB]">{{ score.x }}</div>
            </div>
            <div class="px-4 py-2 text-center bg-gray-50">
              <div class="text-xs uppercase tracking-wide text-gray-500">Draws</div>
              <div class="text-2xl font-semibold text-amber-500">{{ score.draws }}</div>
            </div>
            <div class="px-4 py-2 text-center">
              <div class="text-xs uppercase tracking-wide text-gray-500">Player O</div>
              <div class="text-2xl font-semibold text-[#2563EB]">{{ score.o }}</div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-2 justify-end">
            <button
              class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:scale-[0.99] transition"
              @click="resetBoard"
              :disabled="isAnimating"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6v6l4 2"/>
                <path stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Reset Board
            </button>
            <button
              class="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 active:scale-[0.99] transition"
              @click="restartGame"
              :disabled="isAnimating"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4v5h5M20 20v-5h-5"/>
                <path stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M20 9a8 8 0 10-3 6.32"/>
              </svg>
              Restart Game
            </button>
          </div>
        </div>

        <!-- Status Banner -->
        <div
          class="mt-5 rounded-xl border border-gray-100 bg-gradient-to-r from-blue-50 to-gray-50 px-4 py-3 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100"
            >
              <!-- Current player icon (Knight/Queen) -->
              <svg
                v-if="!winner && !isDraw && currentPlayer === 'X'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Current player: X (Knight)"
                class="size-5"
                fill="currentColor"
                style="color: var(--ocean-primary)"
              >
                <path d="M7 19c0-2.761 2.239-5 5-5h.5c.828 0 1.5-.672 1.5-1.5V11l1.3-.65a1 1 0 0 0 .55-.89V7.9c0-.34-.173-.655-.46-.84l-3.2-2.05a1 1 0 0 0-1.05 0L7.8 5.9A3 3 0 0 0 6.5 8.5V10c0 .552.448 1 1 1h.5c.552 0 1-.448 1-1V9.8c0-.442.358-.8.8-.8h.4c.442 0 .8.358.8.8V11.1c0 1.436-1.164 2.6-2.6 2.6H8.5A4.5 4.5 0 0 0 4 18.2V19c0 .552.448 1 1 1h13c.552 0 1-.448 1-1v-1h-5.5c-1.933 0-3.5 1.567-3.5 3.5H6.5A1.5 1.5 0 0 1 5 20v-1z"/>
              </svg>
              <svg
                v-else-if="!winner && !isDraw && currentPlayer === 'O'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Current player: O (Queen)"
                class="size-5"
                fill="currentColor"
                style="color: var(--ocean-amber)"
              >
                <path d="M6.5 18a.5.5 0 0 1-.4-.8l2.1-2.7A6.5 6.5 0 0 1 6 9.8a1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3 1.3 1.8 1.8 0 0 1 3 1.3 6.5 6.5 0 0 1-2.2 4.7l2.1 2.7a.5.5 0 0 1-.4.8H6.5zM8 20.5c0-.276.224-.5.5-.5h7c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM12 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 1a1 1 0 1 1-.001 1.999A1 1 0 0 1 7 5.5zm10 0a1 1 0 1 1-.001 1.999A1 1 0 0 1 17 5.5z"/>
              </svg>
              <!-- Winner/Draw icons fallback -->
              <svg
                v-else-if="winner"
                xmlns="http://www.w3.org/2000/svg"
                class="size-5 text-amber-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l2.09 6.26h6.58l-5.32 3.86L17.42 20 12 15.9 6.58 20l1.07-7.88L2.33 8.26h6.58L12 2z"/>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="size-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </span>
            <div class="text-sm sm:text-base" aria-live="polite">
              <p v-if="!winner && !isDraw" class="text-gray-700">
                Current Turn:
                <span
                  class="font-semibold"
                  :class="currentPlayer === 'X' ? 'text-[#2563EB]' : 'text-amber-600'"
                  :aria-label="currentPlayer === 'X' ? 'Player X, Knight' : 'Player O, Queen'"
                >
                  Player {{ currentPlayer }}
                </span>
              </p>
              <p v-else-if="winner" class="text-gray-800">
                <span class="font-semibold text-amber-600">Player {{ winner }}</span> wins! 🎉
              </p>
              <p v-else class="text-gray-800">
                It's a draw. 🤝
              </p>
            </div>
          </div>
          <div class="hidden sm:block">
            <span
              class="text-xs font-medium text-gray-500 bg-white rounded-md px-2 py-1 ring-1 ring-gray-200 shadow-sm"
            >
              Local 2‑player
            </span>
          </div>
        </div>

        <!-- Board -->
        <div class="mt-6">
          <div
            class="mx-auto grid grid-cols-3 gap-3 w-full max-w-[420px] aspect-square"
          >
            <button
              v-for="(cell, idx) in board"
              :key="idx"
              class="relative group rounded-xl bg-white ring-1 ring-gray-100 shadow-sm hover:shadow transition p-0 overflow-hidden"
              :class="{
                'cursor-not-allowed opacity-90': !!cell || !!winner || isDraw,
                'cursor-pointer': !cell && !winner && !isDraw
              }"
              @click="handleCellClick(idx)"
              :disabled="!!cell || !!winner || isDraw || isAnimating"
            >
              <!-- subtle highlight on hover -->
              <span
                class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-amber-400/0 group-hover:from-blue-500/5 group-hover:to-amber-400/5 transition"
                aria-hidden="true"
              />
              <!-- cell content -->
              <span
                class="flex h-full w-full items-center justify-center"
                aria-hidden="true"
              >
                <!-- X as Knight (Ocean primary) -->
                <svg
                  v-if="cell === 'X'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  :aria-label="`Player X (Knight)`"
                  class="w-14 h-14 sm:w-20 sm:h-20"
                  fill="currentColor"
                  style="color: var(--ocean-primary)"
                >
                  <!-- Minimal knight silhouette -->
                  <path d="M7 19c0-2.761 2.239-5 5-5h.5c.828 0 1.5-.672 1.5-1.5V11l1.3-.65a1 1 0 0 0 .55-.89V7.9c0-.34-.173-.655-.46-.84l-3.2-2.05a1 1 0 0 0-1.05 0L7.8 5.9A3 3 0 0 0 6.5 8.5V10c0 .552.448 1 1 1h.5c.552 0 1-.448 1-1V9.8c0-.442.358-.8.8-.8h.4c.442 0 .8.358.8.8V11.1c0 1.436-1.164 2.6-2.6 2.6H8.5A4.5 4.5 0 0 0 4 18.2V19c0 .552.448 1 1 1h13c.552 0 1-.448 1-1v-1h-5.5c-1.933 0-3.5 1.567-3.5 3.5H6.5A1.5 1.5 0 0 1 5 20v-1z"/>
                  <!-- Eye dot -->
                  <circle cx="12.9" cy="8.4" r="0.6" fill="white" />
                </svg>
                <!-- O as Queen (Amber accent) -->
                <svg
                  v-else-if="cell === 'O'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  :aria-label="`Player O (Queen)`"
                  class="w-14 h-14 sm:w-20 sm:h-20"
                  fill="currentColor"
                  style="color: var(--ocean-amber)"
                >
                  <!-- Minimal queen silhouette -->
                  <path d="M6.5 18a.5.5 0 0 1-.4-.8l2.1-2.7A6.5 6.5 0 0 1 6 9.8a1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3 1.3 1.8 1.8 0 0 1 3 1.3 6.5 6.5 0 0 1-2.2 4.7l2.1 2.7a.5.5 0 0 1-.4.8H6.5zM8 20.5c0-.276.224-.5.5-.5h7c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM12 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 1a1 1 0 1 1-.001 1.999A1 1 0 0 1 7 5.5zm10 0a1 1 0 1 1-.001 1.999A1 1 0 0 1 17 5.5z"/>
                  <!-- crown dots -->
                  <circle cx="7" cy="5.5" r="0.5" fill="white"/>
                  <circle cx="12" cy="5.5" r="0.5" fill="white"/>
                  <circle cx="17" cy="5.5" r="0.5" fill="white"/>
                </svg>
                <!-- Empty cell placeholder for consistent sizing -->
                <span v-else class="w-14 h-14 sm:w-20 sm:h-20"></span>
              </span>
              <!-- winning highlight -->
              <span
                v-if="winningLine && winningLine.includes(idx)"
                class="pointer-events-none absolute inset-0 ring-2 ring-amber-400 rounded-xl animate-pulse"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- Footer hint -->
        <div class="mt-6 text-center text-xs text-gray-500">
          Tip: Click any empty cell to place your mark. X starts first.
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Core reactive state for Tic Tac Toe
import { computed, ref, watch } from 'vue'

// Game state
type Player = 'X' | 'O'
type Cell = Player | ''

const board = ref<Cell[]>(Array(9).fill(''))
const currentPlayer = ref<Player>('X')
const winner = ref<Player | null>(null)
const isDraw = ref<boolean>(false)
const winningLine = ref<number[] | null>(null)
const isAnimating = ref<boolean>(false)

// Scoreboard
const score = ref<{ x: number; o: number; draws: number }>({ x: 0, o: 0, draws: 0 })

// PUBLIC_INTERFACE
function handleCellClick(index: number) {
  /** Handle a player's move when clicking a cell. Prevent moves if cell is taken or game over. */
  if (board.value[index] || winner.value || isDraw.value || isAnimating.value) return
  board.value[index] = currentPlayer.value
  evaluateBoard()
  if (!winner.value && !isDraw.value) {
    // switch turn
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

const lines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// PUBLIC_INTERFACE
function evaluateBoard() {
  /** Evaluate the board for a winner or draw, update score and highlights with subtle animation. */
  for (const [a, b, c] of lines) {
    const v = board.value
    if (v[a] && v[a] === v[b] && v[a] === v[c]) {
      winner.value = v[a] as Player
      winningLine.value = [a, b, c]
      // Update score with a short animation lock to avoid spamming clicks
      isAnimating.value = true
      if (winner.value === 'X') score.value.x += 1
      if (winner.value === 'O') score.value.o += 1
      setTimeout(() => {
        isAnimating.value = false
      }, 350)
      return
    }
  }
  if (board.value.every((c) => c !== '')) {
    isDraw.value = true
    score.value.draws += 1
  }
}

// PUBLIC_INTERFACE
function resetBoard() {
  /** Clear only the board and round state, keep the score. Next round starts with the other player for variety. */
  board.value = Array(9).fill('')
  winner.value = null
  isDraw.value = false
  winningLine.value = null
  // Alternate starting player each round
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}

// PUBLIC_INTERFACE
function restartGame() {
  /** Fully restart the game: clear board, state, and reset scores; X starts first. */
  resetBoard()
  score.value = { x: 0, o: 0, draws: 0 }
  currentPlayer.value = 'X'
}

// Persist score in-session
watch(score, (val) => {
  try {
    sessionStorage.setItem('ttt_score', JSON.stringify(val))
  } catch {}
}, { deep: true })

// Restore score on mount
onMounted(() => {
  try {
    const saved = sessionStorage.getItem('ttt_score')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (typeof parsed?.x === 'number' && typeof parsed?.o === 'number' && typeof parsed?.draws === 'number') {
        score.value = parsed
      }
    }
  } catch {}
})
</script>

<style>
/* Minimal, modern base styles using CSS vars for Ocean Professional palette */
:root {
  --ocean-primary: #2563EB;
  --ocean-amber: #F59E0B;
  --ocean-error: #EF4444;
  --ocean-surface: #ffffff;
  --ocean-bg: #f9fafb;
  --ocean-text: #111827;
}

/* Smooth transitions for interactive elements */
button {
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 80ms ease;
}

/* Utility-like helpers */
.size-4 { width: 1rem; height: 1rem; }
.size-5 { width: 1.25rem; height: 1.25rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-lg { border-radius: 0.5rem; }

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
