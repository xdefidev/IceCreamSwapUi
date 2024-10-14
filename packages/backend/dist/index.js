"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  trpc: () => trpc,
  trpcClient: () => trpcClient
});
module.exports = __toCommonJS(src_exports);

// src/utils/trpc.ts
var import_client = require("@trpc/client");
var import_next = require("@trpc/next");
function getBaseUrl() {
  if (typeof window !== "undefined")
    return "";
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3e3}`;
}
var trpc = (0, import_next.createTRPCNext)({
  config({ ctx }) {
    return {
      links: [
        (0, import_client.httpBatchLink)({
          url: `${getBaseUrl()}/api/trpc`
        })
      ]
    };
  },
  ssr: true
});
var trpcClient = (0, import_client.createTRPCProxyClient)({
  links: [
    (0, import_client.httpBatchLink)({
      url: `${getBaseUrl()}/api/trpc`
    })
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  trpc,
  trpcClient
});
