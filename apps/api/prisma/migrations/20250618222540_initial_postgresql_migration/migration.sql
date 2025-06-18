CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "last_active_date" TIMESTAMP(3),
    "total_time_spent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "completed_exercises" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "exercise_slug" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_spent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "completed_exercises_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "session_metrics" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exercises_completed" INTEGER NOT NULL DEFAULT 0,
    "time_spent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "session_metrics_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "completed_exercises_session_id_exercise_slug_key" ON "completed_exercises"("session_id", "exercise_slug");

CREATE UNIQUE INDEX "session_metrics_session_id_date_key" ON "session_metrics"("session_id", "date");

ALTER TABLE "completed_exercises" ADD CONSTRAINT "completed_exercises_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "session_metrics" ADD CONSTRAINT "session_metrics_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
