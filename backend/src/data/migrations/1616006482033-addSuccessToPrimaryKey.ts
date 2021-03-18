import {MigrationInterface, QueryRunner} from "typeorm";

export class addSuccessToPrimaryKey1616006482033 implements MigrationInterface {
    name = 'addSuccessToPrimaryKey1616006482033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "PK_46032eeecba2873b949bdc5b777"`);
        await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "PK_337789f4abbdc79f792abb279d5" PRIMARY KEY ("queryId", "triggerQueryId", "success")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "PK_337789f4abbdc79f792abb279d5"`);
        await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "PK_46032eeecba2873b949bdc5b777" PRIMARY KEY ("queryId", "triggerQueryId")`);
    }

}
