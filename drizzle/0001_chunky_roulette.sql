DROP INDEX "idx_useremail";--> statement-breakpoint
CREATE INDEX "idx_useremail" ON "channels" USING btree ("useremail");