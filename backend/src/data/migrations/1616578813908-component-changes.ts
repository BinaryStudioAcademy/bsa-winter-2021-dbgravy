import {MigrationInterface, QueryRunner} from "typeorm";

export class componentChanges1616578813908 implements MigrationInterface {
    name = 'componentChanges1616578813908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "button" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "button" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "button" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component" ADD "componentType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "button" DROP CONSTRAINT "FK_fa8be32cd83a323051f65a9a872"`);
        await queryRunner.query(`ALTER TABLE "button" ALTER COLUMN "queryId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "button"."queryId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "button" ADD CONSTRAINT "FK_fa8be32cd83a323051f65a9a872" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "button" DROP CONSTRAINT "FK_fa8be32cd83a323051f65a9a872"`);
        await queryRunner.query(`COMMENT ON COLUMN "button"."queryId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "button" ALTER COLUMN "queryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "button" ADD CONSTRAINT "FK_fa8be32cd83a323051f65a9a872" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "componentType"`);
        await queryRunner.query(`ALTER TABLE "button" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "button" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "button" ADD "label" character varying NOT NULL`);
    }

}
