import {MigrationInterface, QueryRunner} from "typeorm";

export class createRefreshTokenTable1615141231309 implements MigrationInterface {
    name = 'createRefreshTokenTable1615141231309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expiration" TIMESTAMP NOT NULL, "value" character varying NOT NULL, "userId" uuid, CONSTRAINT "REL_8e913e288156c133999341156a" UNIQUE ("userId"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
