import {MigrationInterface, QueryRunner} from "typeorm";

export class componentsEntities1616023319930 implements MigrationInterface {
    name = 'componentsEntities1616023319930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "componentId" uuid NOT NULL, "queryId" uuid NOT NULL, CONSTRAINT "REL_ca7d1088a45877e520ede2042e" UNIQUE ("componentId"), CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "button" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "componentId" uuid NOT NULL, "queryId" uuid NOT NULL, "label" character varying NOT NULL, CONSTRAINT "REL_fb96e8d5571a89dbce61dcb52f" UNIQUE ("componentId"), CONSTRAINT "PK_a4df4e4f7a5882bc94442d3f209" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "input" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "componentId" uuid NOT NULL, "label" character varying NOT NULL, "placeholder" character varying NOT NULL, CONSTRAINT "REL_c0eab412e9d37c87d157601c7b" UNIQUE ("componentId"), CONSTRAINT "PK_a1deaa2fcdc821329884ad43931" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "text" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "componentId" uuid NOT NULL, "value" character varying NOT NULL, CONSTRAINT "REL_f9e02d9a23e6b62bfcf712e7cd" UNIQUE ("componentId"), CONSTRAINT "PK_ef734161ea7c326fedf699309f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."firstName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."lastName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_ca7d1088a45877e520ede2042ed" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_cc546e752f2db8303676e40b3f8" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "button" ADD CONSTRAINT "FK_fb96e8d5571a89dbce61dcb52fd" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "button" ADD CONSTRAINT "FK_fa8be32cd83a323051f65a9a872" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_c0eab412e9d37c87d157601c7b7" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_f9e02d9a23e6b62bfcf712e7cd2" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "text" DROP CONSTRAINT "FK_f9e02d9a23e6b62bfcf712e7cd2"`);
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_c0eab412e9d37c87d157601c7b7"`);
        await queryRunner.query(`ALTER TABLE "button" DROP CONSTRAINT "FK_fa8be32cd83a323051f65a9a872"`);
        await queryRunner.query(`ALTER TABLE "button" DROP CONSTRAINT "FK_fb96e8d5571a89dbce61dcb52fd"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_cc546e752f2db8303676e40b3f8"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_ca7d1088a45877e520ede2042ed"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."lastName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."firstName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "text"`);
        await queryRunner.query(`DROP TABLE "input"`);
        await queryRunner.query(`DROP TABLE "button"`);
        await queryRunner.query(`DROP TABLE "table"`);
    }

}
