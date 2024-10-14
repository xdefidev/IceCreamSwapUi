import * as _trpc_server_shared from '@trpc/server/shared';
import * as _trpc_react_query_shared from '@trpc/react-query/shared';
import * as _trpc_next from '@trpc/next';
import * as _icecreamswap_database from '@icecreamswap/database';
import { User } from '@icecreamswap/database';
import * as _trpc_server from '@trpc/server';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import * as next from 'next';
import * as iron_session from 'iron-session';

interface Session {
    user?: Pick<User, 'wallet' | 'name' | 'role'>;
}

declare const appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: {
        session: iron_session.IronSessionData & {
            destroy: () => void;
            save: () => Promise<void>;
        } & Session;
        res: next.NextApiResponse;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: _trpc_server.DefaultDataTransformer;
}>, {
    health: _trpc_server.BuildProcedure<"query", {
        _config: _trpc_server.RootConfig<{
            ctx: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _ctx_out: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }, string>;
    session: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        user: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, Partial<Pick<_icecreamswap_database.User, "wallet" | "name" | "role">> & {
            isLoggedIn: boolean;
        }>;
        nonce: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            nonce: string;
        }>;
        login: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                address: string;
                signature: string;
            };
            _input_out: {
                address: string;
                signature: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _icecreamswap_database.User | undefined>;
        logout: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, void>;
    }>;
    token: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        add: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            };
            _input_out: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
        defaultList: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            name: string;
            timestamp: string;
            version: {
                major: number;
                minor: number;
                patch: number;
            };
            tags: {};
            logoURI: string;
            keywords: string[];
            tokens: {
                name: string;
                symbol: string;
                address: string;
                chainId: number;
                decimals: number;
                logoURI: string;
                tags: string[];
            }[];
        }>;
    }>;
    kyc: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        delegate: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
        approve: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, string>;
        reject: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, string>;
        getDelegation: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _icecreamswap_database.Delegation | null>;
        getDelegationSignature: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            signature: string;
            tokenId: number | null;
            targetAddress: string;
        }>;
        submitDelegation: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
    }>;
}>;
type AppRouter = typeof appRouter;

declare const trpc: _trpc_next.CreateTRPCNextBase<_trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: {
        session: iron_session.IronSessionData & {
            destroy: () => void;
            save: () => Promise<void>;
        } & Session;
        res: next.NextApiResponse;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: _trpc_server.DefaultDataTransformer;
}>, {
    health: _trpc_server.BuildProcedure<"query", {
        _config: _trpc_server.RootConfig<{
            ctx: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _ctx_out: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }, string>;
    session: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        user: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, Partial<Pick<_icecreamswap_database.User, "wallet" | "name" | "role">> & {
            isLoggedIn: boolean;
        }>;
        nonce: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            nonce: string;
        }>;
        login: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                address: string;
                signature: string;
            };
            _input_out: {
                address: string;
                signature: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _icecreamswap_database.User | undefined>;
        logout: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, void>;
    }>;
    token: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        add: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            };
            _input_out: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
        defaultList: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            name: string;
            timestamp: string;
            version: {
                major: number;
                minor: number;
                patch: number;
            };
            tags: {};
            logoURI: string;
            keywords: string[];
            tokens: {
                name: string;
                symbol: string;
                address: string;
                chainId: number;
                decimals: number;
                logoURI: string;
                tags: string[];
            }[];
        }>;
    }>;
    kyc: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        delegate: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
        approve: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, string>;
        reject: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, string>;
        getDelegation: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _icecreamswap_database.Delegation | null>;
        getDelegationSignature: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            signature: string;
            tokenId: number | null;
            targetAddress: string;
        }>;
        submitDelegation: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
    }>;
}>, next.NextPageContext> & _trpc_react_query_shared.DecoratedProcedureRecord<{
    health: _trpc_server.BuildProcedure<"query", {
        _config: _trpc_server.RootConfig<{
            ctx: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _ctx_out: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }, string>;
    session: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        user: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, Partial<Pick<_icecreamswap_database.User, "wallet" | "name" | "role">> & {
            isLoggedIn: boolean;
        }>;
        nonce: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            nonce: string;
        }>;
        login: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                address: string;
                signature: string;
            };
            _input_out: {
                address: string;
                signature: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _icecreamswap_database.User | undefined>;
        logout: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, void>;
    }>;
    token: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        add: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            };
            _input_out: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
        defaultList: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }, {
            name: string;
            timestamp: string;
            version: {
                major: number;
                minor: number;
                patch: number;
            };
            tags: {};
            logoURI: string;
            keywords: string[];
            tokens: {
                name: string;
                symbol: string;
                address: string;
                chainId: number;
                decimals: number;
                logoURI: string;
                tags: string[];
            }[];
        }>;
    }>;
    kyc: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            session: iron_session.IronSessionData & {
                destroy: () => void;
                save: () => Promise<void>;
            } & Session;
            res: next.NextApiResponse;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        delegate: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
        approve: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, string>;
        reject: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, string>;
        getDelegation: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _icecreamswap_database.Delegation | null>;
        getDelegationSignature: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            signature: string;
            tokenId: number | null;
            targetAddress: string;
        }>;
        submitDelegation: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    session: iron_session.IronSessionData & {
                        destroy: () => void;
                        save: () => Promise<void>;
                    } & Session;
                    res: next.NextApiResponse;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                session: iron_session.IronSessionData & {
                    destroy: () => void;
                    save: () => Promise<void>;
                } & Session;
                res: next.NextApiResponse;
            };
            _input_in: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _input_out: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, void>;
    }>;
}, null, "">;
declare const trpcClient: {
    health: {
        query: (input?: void | undefined, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<string>;
    };
    session: {
        user: {
            query: (input?: void | undefined, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<{
                wallet?: string | undefined;
                name?: string | undefined;
                role?: _icecreamswap_database.Role | undefined;
                isLoggedIn: boolean;
            }>;
        };
        nonce: {
            query: (input?: void | undefined, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<{
                nonce: string;
            }>;
        };
        login: {
            mutate: (input: {
                address: string;
                signature: string;
            }, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<{
                wallet: string;
                name: string;
                role: _icecreamswap_database.Role;
                id: number;
                createdAt: string;
            }>;
        };
        logout: {
            mutate: (input?: void | undefined, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<never>;
        };
    };
    token: {
        add: {
            mutate: (input: {
                chainId: number;
                tokenAddress: string;
                tokenName: string;
                tokenSymbol: string;
                tokenDecimals: number;
                logo?: string | undefined;
            }, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<never>;
        };
        defaultList: {
            query: (input?: void | undefined, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<{
                name: string;
                version: _trpc_server_shared.SerializeObject<Pick<{
                    major: number;
                    minor: number;
                    patch: number;
                }, "major" | "minor" | "patch"> & {}>;
                logoURI: string;
                timestamp: string;
                tags: _trpc_server_shared.SerializeObject<Pick<{}, never> & {}>;
                keywords: string[];
                tokens: _trpc_server_shared.SerializeObject<Pick<{
                    name: string;
                    symbol: string;
                    address: string;
                    chainId: number;
                    decimals: number;
                    logoURI: string;
                    tags: string[];
                }, "symbol" | "name" | "address" | "decimals" | "chainId" | "logoURI" | "tags"> & {}>[];
            }>;
        };
    };
    kyc: {
        delegate: {
            mutate: (input: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            }, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<never>;
        };
        approve: {
            query: (input: string, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<string>;
        };
        reject: {
            query: (input: string, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<string>;
        };
        getDelegation: {
            query: (input: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            }, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<{
                id: number;
                createdAt: string;
                tokenId: number | null;
                chainId: number;
                status: _icecreamswap_database.DelegationStatus;
                target: string;
                kycId: number;
            } | null>;
        };
        getDelegationSignature: {
            query: (input: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            }, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<{
                tokenId: number | null;
                targetAddress: string;
                signature: string;
            }>;
        };
        submitDelegation: {
            mutate: (input: {
                targetAddress: string;
                sourceAddress: string;
                chainId: number;
            }, opts?: _trpc_server.ProcedureOptions | undefined) => Promise<never>;
        };
    };
};
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export { RouterInput, RouterOutput, trpc, trpcClient };
