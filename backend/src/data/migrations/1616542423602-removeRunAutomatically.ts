import {MigrationInterface, QueryRunner} from "typeorm";

export class removeRunAutomatically1616542423602 implements MigrationInterface {
    name = 'removeRunAutomatically1616542423602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_0b998fe735d3a77c04ae24366d4"`);
        await queryRunner.query(`ALTER TABLE "input" DROP COLUMN "queryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "input" ADD "queryId" uuid`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_0b998fe735d3a77c04ae24366d4" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
