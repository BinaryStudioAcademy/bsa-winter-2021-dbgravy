import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeDelete1616152281581 implements MigrationInterface {
    name = 'addCascadeDelete1616152281581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_3a9a94c684f072eb056828e101b"`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_3a9a94c684f072eb056828e101b" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_3a9a94c684f072eb056828e101b"`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_3a9a94c684f072eb056828e101b" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
