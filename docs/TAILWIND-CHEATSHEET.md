# Tailwind CSS v4 - Cheatsheet

Riferimento rapido per le classi Tailwind più usate.
Documentazione ufficiale: https://tailwindcss.com/docs

## Font Size (`text-*`)

| Classe | Dimensione | px |
|--------|------------|-----|
| `text-xs` | 0.75rem | 12px |
| `text-sm` | 0.875rem | 14px |
| `text-base` | 1rem | 16px |
| `text-lg` | 1.125rem | 18px |
| `text-xl` | 1.25rem | 20px |
| `text-2xl` | 1.5rem | 24px |
| `text-3xl` | 1.875rem | 30px |
| `text-4xl` | 2.25rem | 36px |
| `text-5xl` | 3rem | 48px |
| `text-6xl` | 3.75rem | 60px |
| `text-7xl` | 4.5rem | 72px |
| `text-8xl` | 6rem | 96px |
| `text-9xl` | 8rem | 128px |

**Con line-height**: `text-lg/7` (font-size lg + line-height 1.75rem)

**Valori custom**: `text-[18px]` o `text-[1.125rem]`

## Spacing (`p-*`, `m-*`, `gap-*`, `w-*`, `h-*`)

| Valore | rem | px |
|--------|-----|-----|
| `0` | 0 | 0 |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |
| `24` | 6rem | 96px |
| `32` | 8rem | 128px |

**Varianti direzionali**:
- `p-4` = padding su tutti i lati
- `px-4` = padding left + right
- `py-4` = padding top + bottom
- `pt-4`, `pr-4`, `pb-4`, `pl-4` = singolo lato

## Breakpoints (responsive)

| Prefisso | Min-width | Descrizione |
|----------|-----------|-------------|
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |
| `2xl:` | 1536px | Extra large |

**Uso**: `text-sm md:text-base lg:text-lg` (mobile-first)

## Border Width (`border-*`)

| Classe | Spessore |
|--------|----------|
| `border` | 1px |
| `border-0` | 0px |
| `border-2` | 2px |
| `border-4` | 4px |
| `border-8` | 8px |

**Varianti**: `border-t-2`, `border-r-2`, `border-b-2`, `border-l-2`, `border-x-2`, `border-y-2`

## Border Radius (`rounded-*`)

| Classe | Valore |
|--------|--------|
| `rounded-none` | 0 |
| `rounded-sm` | 0.125rem (2px) |
| `rounded` | 0.25rem (4px) |
| `rounded-md` | 0.375rem (6px) |
| `rounded-lg` | 0.5rem (8px) |
| `rounded-xl` | 0.75rem (12px) |
| `rounded-2xl` | 1rem (16px) |
| `rounded-3xl` | 1.5rem (24px) |
| `rounded-full` | 9999px |

## Note

- **Mobile-first**: le classi base si applicano a tutti, i prefissi (`sm:`, `md:`, etc.) sovrascrivono verso l'alto
- **Valori arbitrari**: usa `[valore]` per qualsiasi valore custom, es. `w-[300px]`, `text-[#ff0000]`
- **Classi deprecate v4**: `flex-shrink-0` → `shrink-0`, `flex-grow` → `grow`
