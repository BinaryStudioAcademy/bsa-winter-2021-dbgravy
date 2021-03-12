import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqeResourceName1615402126348 implements MigrationInterface {
    name = 'uniqeResourceName1615402126348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."resource_type_enum" RENAME TO "resource_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "resource_type_enum" AS ENUM('PostgreSQL', 'MongoDB')`);
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "type" TYPE "resource_type_enum" USING "type"::"text"::"resource_type_enum"`);
        await queryRunner.query(`DROP TYPE "resource_type_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "resource"."type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "UQ_8b590287892008099589a5a186d" UNIQUE ("organizationId", "name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "UQ_8b590287892008099589a5a186d"`);
        await queryRunner.query(`COMMENT ON COLUMN "resource"."type" IS NULL`);
        await queryRunner.query(`CREATE TYPE "resource_type_enum_old" AS ENUM('postgres', 'mongodb')`);
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "type" TYPE "resource_type_enum_old" USING "type"::"text"::"resource_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "resource_type_enum"`);
        await queryRunner.query(`ALTER TYPE "resource_type_enum_old" RENAME TO  "resource_type_enum"`);
    }

}
