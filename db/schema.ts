import {
    pgTable, serial, text, varchar, timestamp,
    integer, boolean, json, uniqueIndex, index
} from "drizzle-orm/pg-core";

export const channel = pgTable("channels", {
    id: serial("id").primaryKey(),
    speciality: text("speciality").notNull(),
    doctorname: text("doctorname").notNull(),
    doctorid: text("doctorid").notNull(),
    dateforchannel: text("dateforchannel").notNull(),
    timeforchannel: text("timeforchannel").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdateFn(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }).defaultNow().$onUpdateFn(() => new Date()),
    isDeleted: boolean("is_deleted").default(false),
    userId: text("user_id").notNull(),
    username: text("username").notNull(),
    useremail: text("useremail").notNull(),
    userphone: text("userphone").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("Pending"),
    rejectReason: text("reject_reason"),
},
    (table) => ({
        idx_useremail: index("idx_useremail").on(table.useremail),
        statusIndex: index("statusIndex").on(table.status),
        createdAtIndex: index("createdAtIndex").on(table.createdAt),


    })
);


