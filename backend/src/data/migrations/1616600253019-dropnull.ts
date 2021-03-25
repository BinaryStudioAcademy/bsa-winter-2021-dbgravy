import {MigrationInterface, QueryRunner} from "typeorm";

export class dropnull1616600253019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "queryId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "table" ALTER COLUMN "queryId" SET NOT NULL`);
    }

}
