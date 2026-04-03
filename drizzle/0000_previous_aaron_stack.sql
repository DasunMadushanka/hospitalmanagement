CREATE TABLE "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"speciality" text NOT NULL,
	"doctorname" text NOT NULL,
	"doctorid" text NOT NULL,
	"dateforchannel" text NOT NULL,
	"timeforchannel" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone DEFAULT now(),
	"is_deleted" boolean DEFAULT false,
	"user_id" text NOT NULL,
	"username" text NOT NULL,
	"useremail" text NOT NULL,
	"userphone" text NOT NULL,
	"status" varchar(20) DEFAULT 'Pending' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_useremail" ON "channels" USING btree ("useremail");--> statement-breakpoint
CREATE INDEX "statusIndex" ON "channels" USING btree ("status");--> statement-breakpoint
CREATE INDEX "createdAtIndex" ON "channels" USING btree ("created_at");