import {MigrationInterface, QueryRunner} from "typeorm";

export class notAutoRun1616606996441 implements MigrationInterface {
    name = 'notAutoRun1616606996441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query" DROP COLUMN "runAutomatically"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query" ADD "runAutomatically" boolean NOT NULL`);
    }

}
