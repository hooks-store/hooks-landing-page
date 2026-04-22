# AGENTS

## 1. Environment
- Use `pnpm` as the package manager.
- Always run `source ~/.nvm/nvm.sh && nvm use 24` before project commands.

## 2. Development workflow
- Prefer targeted edits over full rewrites.
- Do not rebuild components or sections unless explicitly instructed.
- Reuse existing components, assets, and structure whenever possible.
- Do not introduce new dependencies unless absolutely necessary.

## 3. Verification
- After every change, run:
  - `pnpm run build`
  - `pnpm run check`
- If a failure occurs, fix only issues caused by the latest changes.
- If no test suite exists, do not create one unless explicitly requested.

## 4. UI/UX rules (important for this project)
- Maintain existing section order and layout.
- Do not add new sections or features unless explicitly asked.
- Keep design minimal, premium, and non-templated.
- Avoid flashy animations, floating decorations, or unnecessary visual effects.
- Cards should remain static (no hover lift transforms unless explicitly requested).
- Prefer removing elements over adding new ones.

## 5. Code style
- Make minimal, precise changes.
- Do not refactor unrelated code.
- Preserve existing naming and structure unless required for the task.

## 6. Output expectations
- Always summarize what was changed.
- Always list files modified.
- Always report results of build/check commands.
