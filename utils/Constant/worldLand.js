/**
 * Shared world landmass, as a run-length encoded dot grid.
 *
 * Generated once from Natural Earth 110m land polygons (world-atlas), rasterised onto
 * a 120x54 equirectangular grid and run-length encoded as "start:length" spans of
 * "there is land here" per row. Baked in as a literal rather than fetched or computed:
 * the geography never changes, so this costs ~2kb of source, zero network requests and
 * zero runtime work, and adds no dependency to package.json.
 *
 * Rows 0-1 (arctic ice) and 44+ (Antarctica) are intentionally omitted. Neither carries
 * meaning on a markets map, and Antarctica in particular is a wide bright bar across the
 * bottom of an equirectangular projection that pulls the eye off the content.
 *
 * Consumed by two components that project it differently:
 *   - common/WorldReachMap  — equirectangular, the wide plate on /contact
 *   - common/MarketGlobe    — orthographic, the sphere beside the markets copy on /about
 */
export const COLS = 120;
export const ROWS = 54;
export const LAND = {
  2: "30:8 39:14 54:2",
  3: "26:2 29:1 31:4 36:17 64:2 67:1 93:2",
  4: "22:3 28:5 41:12 79:1 89:9 106:2 109:1",
  5: "18:7 27:2 30:5 41:11 77:2 83:1 85:18 107:3",
  6: "1:3 22:2 25:2 33:2 38:4 50:15 73:4",
  7: "0:1 2:2 32:2 38:5 47:5 55:9 67:1",
  8: "5:24 34:2 44:2 62:4 67:47 115:3",
  9: "7:2 14:15 34:3 38:1 58:1 62:1 64:2 68:39 113:1",
  10: "5:1 16:17 34:7 57:3 67:38 112:2",
  11: "17:16 34:7 58:2 61:47 112:1",
  12: "18:20 40:2 58:50",
  13: "19:20 60:4 65:5 71:5 77:29 107:1",
  14: "19:18 57:4 64:1 67:2 71:1 74:2 78:25",
  15: "19:16 57:3 67:1 69:7 78:21 102:1 106:1",
  16: "20:15 58:6 68:1 72:28 102:1 104:3",
  17: "21:12 57:8 67:1 72:29 103:1",
  18: "23:5 32:1 56:15 72:4 77:24",
  19: "24:3 55:22 78:1 82:19",
  20: "25:2 33:1 54:18 73:7 83:6 91:6",
  21: "25:3 29:2 35:2 55:18 74:5 84:4 91:4 96:1 100:1",
  22: "29:3 54:19 74:3 85:2 93:3 100:1",
  23: "31:1 55:19 85:2 94:2",
  24: "32:1 34:6 56:21 101:1",
  25: "34:9 57:1 59:1 62:14 92:2 98:2",
  26: "34:9 63:12 93:2 96:3",
  27: "33:12 63:11 94:1 97:2 100:1 104:1",
  28: "33:15 64:9 106:3 110:1",
  29: "34:14 64:9 97:3 107:1",
  30: "34:14 65:8 107:1",
  31: "35:12 64:10 76:1 102:3 107:1",
  32: "37:10 64:8 75:1 101:8",
  33: "37:9 65:7 74:2 98:12 115:1",
  34: "36:8 65:6 75:1 98:13",
  35: "36:8 65:6 98:13",
  36: "36:7 66:4 99:4 104:7",
  37: "36:5 106:4",
  38: "36:5 107:2 118:1",
  39: "35:3 108:1 117:1",
  40: "35:3 116:1",
  41: "35:3",
  42: "35:2 40:1",
  43: "36:2",
};
