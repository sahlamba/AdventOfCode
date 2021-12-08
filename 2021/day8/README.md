# Seven-segment Display

```
               (top)
               -----
   (top-left) |     | (top-right)
              |     |
     (middle)  -----
(bottom-left) |     | (bottom-right)
              |     |
               -----
              (bottom)
```

## Segments used by each digit

| Digit | Segment Set             | Segment Set Size |
| ----- | ----------------------- | ---------------- |
| 0     | t, tl, tr, bl, br, b    | 6                |
| 1     | tr, br                  | 2                |
| 2     | t, tr, m, bl, b         | 5                |
| 3     | t, tr, m, br, b         | 5                |
| 4     | tl, tr, m, br           | 4                |
| 5     | t, tl, m, br, b         | 5                |
| 6     | t, tl, m, bl, br, b     | 6                |
| 7     | t, tr, br               | 3                |
| 8     | t, tl, tr, m, bl, br, b | 7                |
| 9     | t, tl, tr, m, br, b     | 6                |

## Segment Patterns

1. Digits `1, 4, 7, 8` have unique segment set sizes.
2. Digits `2, 3, 5` have segment set size = 5.

   - All segments used in `1 (tr, br)` are present in `3`.
   - Exactly two segments (`tr`, `m`) are common only between `4 (complete set known)` and `2`.
   - By elimination, remaining digit is `5`.

3. Digits `0, 6, 9` have segment set size = 6.

   - All segments used in `4` are in `9`.
   - Between `0` and `6`, only one segment is different (`tr <-> m`)
     - if segment exists in digit `1`'s segment set (i.e. `tr`), then digit is `0`
     - else digit is `6` (i.e. `m`)
