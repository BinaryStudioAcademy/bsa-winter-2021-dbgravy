import {MigrationInterface, QueryRunner} from "typeorm";

export class fixRequiredFields1615287454142 implements MigrationInterface {
    name = 'fixRequiredFields1615287454142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"  RENAME COLUMN "firstname" TO "firstName"`);
        await queryRunner.query(`ALTER TABLE "user"  ALTER "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"  RENAME COLUMN "lastname" TO "lastName"`);
        await queryRunner.query(`ALTER TABLE "user"  ALTER "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"  RENAME COLUMN "firstName" TO "firstname"`);
        await queryRunner.query(`ALTER TABLE "user"  ALTER "firstname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"  RENAME COLUMN "lastName" TO "lastname"`);
        await queryRunner.query(`ALTER TABLE "user"  ALTER "lastname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "password" SET NOT NULL`);
    }

}
