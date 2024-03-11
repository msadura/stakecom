import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  pgEnum,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { createPgTable } from "./_table";

export const staker = createPgTable(
  "staker",
  {
    evmAddress: varchar("evm_address", { length: 256 }).notNull().primaryKey(),
    ss58Address: varchar("ss58_address", { length: 256 }).notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
    // currently staked module / validator
    module: varchar("module", { length: 256 }),
    // current native stake
    stake: varchar("stake", { length: 256 }),
    // initially deposited stake
    deposit: varchar("deposit", { length: 256 }).default("0"),
    // current native balance (not staked)
    balance: varchar("balance", { length: 256 }).default("0"),
    mnemonicEncrypted: varchar("phrase_encrypted", { length: 256 }).notNull(),
  },
  (t) => ({
    evmAddressIdx: index("evm_address_idx").on(t.evmAddress),
  }),
);

export const stakerRelations = relations(staker, ({ many }) => ({
  stakeEvents: many(stakeEvent),
}));

export const eventTypeEnum = pgEnum("event_type", [
  "stake",
  "initUnstake",
  "changeModule",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "pending",
  "completed",
  "failed",
]);

export const stakeEvent = createPgTable(
  "stake_event",
  {
    id: serial("id").primaryKey(),
    evmAddress: varchar("evm_address", { length: 256 })
      .references(() => staker.evmAddress, { onDelete: "no action" })
      .notNull(),
    eventType: eventTypeEnum("event_type").notNull(),
    status: eventStatusEnum("event_status").notNull(),
    amount: varchar("amount", { length: 256 }),
    fromAmount: varchar("from_amount", { length: 256 }),
    module: varchar("module", { length: 256 }),
    unstakeAll: boolean("unstake_all"),
    block: bigint("block", { mode: "bigint" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }),
    evmTxHash: varchar("evm_tx_hash", { length: 256 }).unique(),
    communeTxHash: varchar("commune_tx_hash", { length: 256 }).unique(),
    pendingTransfer: boolean("pending_transfer").default(false),
    retries: integer("retries").default(0),
  },
  (t) => ({
    unq: unique().on(t.evmAddress, t.eventType, t.block),
    blockIdx: index("block_idx").on(t.block).desc(),
    blockAddressIdx: index("block_address_idx").on(t.block, t.evmAddress),
  }),
);

export const stakeEventRelations = relations(stakeEvent, ({ one }) => ({
  staker: one(staker, {
    fields: [stakeEvent.evmAddress],
    references: [staker.evmAddress],
  }),
}));
