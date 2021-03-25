import {MigrationInterface, QueryRunner} from "typeorm";

export class addInputQueryId1616542595399 implements MigrationInterface {
    name = 'addInputQueryId1616542595399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "input" ADD "queryId" uuid`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_0b998fe735d3a77c04ae24366d4" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_0b998fe735d3a77c04ae24366d4"`);
        await queryRunner.query(`ALTER TABLE "input" DROP COLUMN "queryId"`);
    }

}
