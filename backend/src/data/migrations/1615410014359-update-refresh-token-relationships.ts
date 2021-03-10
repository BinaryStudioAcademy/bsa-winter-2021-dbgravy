import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRefreshTokenRelationships1615410014359 implements MigrationInterface {
    name = 'updateRefreshTokenRelationships1615410014359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`COMMENT ON COLUMN "refresh_token"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "REL_8e913e288156c133999341156a"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."firstName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."lastName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."lastName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."firstName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "REL_8e913e288156c133999341156a" UNIQUE ("userId")`);
        await queryRunner.query(`COMMENT ON COLUMN "refresh_token"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
