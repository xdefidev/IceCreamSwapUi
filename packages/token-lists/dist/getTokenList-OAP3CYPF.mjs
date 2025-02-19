import { __async } from './chunk-2L3ZO4UM.mjs';
import remove from 'lodash/remove';
import Ajv from 'ajv';

// ../utils/uriToHttp.ts
function uriToHttp(uri) {
  var _a, _b;
  const protocol = uri.split(":")[0].toLowerCase();
  switch (protocol) {
    case "https":
      return [uri];
    case "http":
      return [`https${uri.substring(4)}`, uri];
    case "ipfs":
      const hash = (_a = uri.match(/^ipfs:(\/\/)?(.*)$/i)) == null ? void 0 : _a[2];
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`];
    case "ipns":
      const name = (_b = uri.match(/^ipns:(\/\/)?(.*)$/i)) == null ? void 0 : _b[2];
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`];
    default:
      return [];
  }
}

// schema/pancakeswap.json
var pancakeswap_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "pancakeswap",
  title: "IncaSwap Token List",
  description: "Schema for lists of tokens compatible with the IncaSwap Interface, including Uniswap standard and IncaSwap Aptos",
  definitions: {
    Version: {
      type: "object",
      description: "The version of the list, used in change detection",
      examples: [
        {
          major: 1,
          minor: 0,
          patch: 0
        }
      ],
      additionalProperties: false,
      properties: {
        major: {
          type: "integer",
          description: "The major version of the list. Must be incremented when tokens are removed from the list or token addresses are changed.",
          minimum: 0,
          examples: [1, 2]
        },
        minor: {
          type: "integer",
          description: "The minor version of the list. Must be incremented when tokens are added to the list.",
          minimum: 0,
          examples: [0, 1]
        },
        patch: {
          type: "integer",
          description: "The patch version of the list. Must be incremented for any changes to the list.",
          minimum: 0,
          examples: [0, 1]
        }
      },
      required: ["major", "minor", "patch"]
    },
    TagIdentifier: {
      type: "string",
      description: "The unique identifier of a tag",
      minLength: 1,
      maxLength: 10,
      pattern: "^[\\w]+$",
      examples: ["compound", "stablecoin"]
    },
    ExtensionIdentifier: {
      type: "string",
      description: "The name of a token extension property",
      minLength: 1,
      maxLength: 40,
      pattern: "^[\\w]+$",
      examples: ["color", "is_fee_on_transfer", "aliases"]
    },
    ExtensionMap: {
      type: "object",
      description: "An object containing any arbitrary or vendor-specific token metadata",
      maxProperties: 10,
      propertyNames: {
        $ref: "#/definitions/ExtensionIdentifier"
      },
      additionalProperties: {
        $ref: "#/definitions/ExtensionValue"
      },
      examples: [
        {
          color: "#000000",
          is_verified_by_me: true
        },
        {
          "x-bridged-addresses-by-chain": {
            "1": {
              bridgeAddress: "0x4200000000000000000000000000000000000010",
              tokenAddress: "0x4200000000000000000000000000000000000010"
            }
          }
        }
      ]
    },
    ExtensionPrimitiveValue: {
      anyOf: [
        {
          type: "string",
          minLength: 1,
          maxLength: 42,
          examples: ["#00000"]
        },
        {
          type: "boolean",
          examples: [true]
        },
        {
          type: "number",
          examples: [15]
        },
        {
          type: "null"
        }
      ]
    },
    ExtensionValue: {
      anyOf: [
        {
          $ref: "#/definitions/ExtensionPrimitiveValue"
        },
        {
          type: "object",
          maxProperties: 10,
          propertyNames: {
            $ref: "#/definitions/ExtensionIdentifier"
          },
          additionalProperties: {
            $ref: "#/definitions/ExtensionValueInner0"
          }
        }
      ]
    },
    ExtensionValueInner0: {
      anyOf: [
        {
          $ref: "#/definitions/ExtensionPrimitiveValue"
        },
        {
          type: "object",
          maxProperties: 10,
          propertyNames: {
            $ref: "#/definitions/ExtensionIdentifier"
          },
          additionalProperties: {
            $ref: "#/definitions/ExtensionValueInner1"
          }
        }
      ]
    },
    ExtensionValueInner1: {
      anyOf: [
        {
          $ref: "#/definitions/ExtensionPrimitiveValue"
        }
      ]
    },
    TagDefinition: {
      type: "object",
      description: "Definition of a tag that can be associated with a token via its identifier",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          description: "The name of the tag",
          pattern: "^[ \\w]+$",
          minLength: 1,
          maxLength: 20
        },
        description: {
          type: "string",
          description: "A user-friendly description of the tag",
          pattern: "^[ \\w\\.,:]+$",
          minLength: 1,
          maxLength: 200
        }
      },
      required: ["name", "description"],
      examples: [
        {
          name: "Stablecoin",
          description: "A token with value pegged to another asset"
        }
      ]
    },
    TokenInfo: {
      type: "object",
      description: "Metadata for a single token in a token list",
      additionalProperties: false,
      properties: {
        chainId: {
          type: "integer",
          description: "The chain ID of the Ethereum network where this token is deployed",
          minimum: 1,
          examples: [1, 42]
        },
        address: {
          type: "string",
          description: "The checksummed address of the token on the specified chain ID",
          pattern: "^0x[a-fA-F0-9]{40}$",
          examples: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]
        },
        decimals: {
          type: "integer",
          description: "The number of decimals for the token balance",
          minimum: 0,
          maximum: 255,
          examples: [18]
        },
        name: {
          type: "string",
          description: "The name of the token",
          minLength: 1,
          maxLength: 40,
          pattern: "^[ \\w.'+\\-%/@\xC0-\xD6\xD8-\xF6\xF8-\xFF:&\\[\\]\\(\\)]+$",
          examples: ["USD Coin"]
        },
        symbol: {
          type: "string",
          description: "The symbol for the token; must be alphanumeric",
          pattern: "^[a-zA-Z0-9+\\-%/$.]+$",
          minLength: 1,
          maxLength: 20,
          examples: ["USDC"]
        },
        logoURI: {
          type: "string",
          description: "A URI to the token logo asset; if not set, interface will attempt to find a logo based on the token address; suggest SVG or PNG of size 64x64",
          format: "uri",
          examples: ["ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"]
        },
        tags: {
          type: "array",
          description: "An array of tag identifiers associated with the token; tags are defined at the list level",
          items: {
            $ref: "#/definitions/TagIdentifier"
          },
          maxItems: 10,
          examples: ["stablecoin", "compound"]
        },
        extensions: {
          $ref: "#/definitions/ExtensionMap"
        }
      },
      required: ["chainId", "address", "decimals", "name", "symbol"]
    },
    AptosTokenInfo: {
      type: "object",
      description: "Metadata for a single token in a token list",
      additionalProperties: false,
      properties: {
        chainId: {
          type: "integer",
          description: "The chain ID of the Aptos network where this token is deployed, 0 is devent",
          minimum: 0,
          examples: [1, 42]
        },
        address: {
          type: "string",
          description: "The address of the coin on the specified chain ID",
          examples: ["0x1::aptos_coin::AptosCoin"]
        },
        decimals: {
          type: "integer",
          description: "The number of decimals for the token balance",
          minimum: 0,
          maximum: 255,
          examples: [18]
        },
        name: {
          type: "string",
          description: "The name of the token",
          minLength: 1,
          maxLength: 40,
          pattern: "^[ \\w.'+\\-%/@\xC0-\xD6\xD8-\xF6\xF8-\xFF:&\\[\\]\\(\\)]+$",
          examples: ["USD Coin"]
        },
        symbol: {
          type: "string",
          description: "The symbol for the token; must be alphanumeric",
          pattern: "^[a-zA-Z0-9+\\-%/$.]+$",
          minLength: 1,
          maxLength: 20,
          examples: ["USDC"]
        },
        logoURI: {
          type: "string",
          description: "A URI to the token logo asset; if not set, interface will attempt to find a logo based on the token address; suggest SVG or PNG of size 64x64",
          format: "uri",
          examples: ["ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"]
        },
        tags: {
          type: "array",
          description: "An array of tag identifiers associated with the token; tags are defined at the list level",
          items: {
            $ref: "#/definitions/TagIdentifier"
          },
          maxItems: 10,
          examples: ["stablecoin", "compound"]
        },
        extensions: {
          $ref: "#/definitions/ExtensionMap"
        }
      },
      required: ["chainId", "address", "decimals", "name", "symbol"]
    }
  },
  type: "object",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      description: "The name of the token list",
      minLength: 1,
      maxLength: 30,
      pattern: "^[\\w ]+$",
      examples: ["My Token List"]
    },
    timestamp: {
      type: "string",
      format: "date-time",
      description: "The timestamp of this list version; i.e. when this immutable version of the list was created"
    },
    schema: {
      type: "string"
    },
    version: {
      $ref: "#/definitions/Version"
    },
    tokens: {
      type: "array",
      description: "The list of tokens included in the list",
      minItems: 1,
      maxItems: 1e4
    },
    keywords: {
      type: "array",
      description: "Keywords associated with the contents of the list; may be used in list discoverability",
      items: {
        type: "string",
        description: "A keyword to describe the contents of the list",
        minLength: 1,
        maxLength: 20,
        pattern: "^[\\w ]+$",
        examples: ["compound", "lending", "personal tokens"]
      },
      maxItems: 20,
      uniqueItems: true
    },
    tags: {
      type: "object",
      description: "A mapping of tag identifiers to their name and description",
      propertyNames: {
        $ref: "#/definitions/TagIdentifier"
      },
      additionalProperties: {
        $ref: "#/definitions/TagDefinition"
      },
      maxProperties: 20,
      examples: [
        {
          stablecoin: {
            name: "Stablecoin",
            description: "A token with value pegged to another asset"
          }
        }
      ]
    },
    logoURI: {
      type: "string",
      description: "A URI for the logo of the token list; prefer SVG or PNG of size 256x256",
      format: "uri",
      examples: ["ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"]
    }
  },
  if: {
    properties: { schema: { const: "aptos" } },
    required: ["name", "timestamp", "version", "tokens", "schema"]
  },
  then: {
    properties: {
      tokens: {
        items: {
          $ref: "#/definitions/AptosTokenInfo"
        },
        type: "array",
        description: "The list of tokens included in the list",
        minItems: 1,
        maxItems: 1e4
      }
    }
  },
  else: {
    properties: {
      tokens: {
        items: {
          $ref: "#/definitions/TokenInfo"
        },
        type: "array",
        description: "The list of tokens included in the list",
        minItems: 1,
        maxItems: 1e4
      }
    }
  },
  required: ["name", "timestamp", "version", "tokens"]
};

// react/getTokenList.ts
var tokenListValidator = new Ajv({ allErrors: true }).compile(pancakeswap_default);
function getTokenList(listUrl) {
  return __async(this, null, function* () {
    var _a, _b;
    const urls = uriToHttp(listUrl);
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const isLast = i === urls.length - 1;
      let response;
      try {
        response = yield fetch(url);
      } catch (error) {
        console.error("Failed to fetch list", listUrl, error);
        if (isLast)
          throw new Error(`Failed to download list ${listUrl}`);
        continue;
      }
      if (!response.ok) {
        if (isLast)
          throw new Error(`Failed to download list ${listUrl}`);
        continue;
      }
      const json = yield response.json();
      if (json.tokens) {
        remove(json.tokens, (token) => {
          return token.symbol ? token.symbol.length === 0 : true;
        });
      }
      if (!tokenListValidator(json)) {
        const validationErrors = (_b = (_a = tokenListValidator.errors) == null ? void 0 : _a.reduce((memo, error) => {
          var _a2;
          const add = `${error.dataPath} ${(_a2 = error.message) != null ? _a2 : ""}`;
          return memo.length > 0 ? `${memo}; ${add}` : `${add}`;
        }, "")) != null ? _b : "unknown error";
        throw new Error(`Token list failed validation: ${validationErrors}`);
      }
      return json;
    }
    throw new Error("Unrecognized list URL protocol.");
  });
}

export { getTokenList as default, tokenListValidator };
