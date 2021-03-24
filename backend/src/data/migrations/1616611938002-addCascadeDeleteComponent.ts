import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeDeleteComponent1616611938002 implements MigrationInterface {
    name = 'addCascadeDeleteComponent1616611938002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_ca7d1088a45877e520ede2042ed"`);
        await queryRunner.query(`ALTER TABLE "button" DROP CONSTRAINT "FK_fb96e8d5571a89dbce61dcb52fd"`);
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_c0eab412e9d37c87d157601c7b7"`);
        await queryRunner.query(`ALTER TABLE "text" DROP CONSTRAINT "FK_f9e02d9a23e6b62bfcf712e7cd2"`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_ca7d1088a45877e520ede2042ed" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "button" ADD CONSTRAINT "FK_fb96e8d5571a89dbce61dcb52fd" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_c0eab412e9d37c87d157601c7b7" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_f9e02d9a23e6b62bfcf712e7cd2" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "text" DROP CONSTRAINT "FK_f9e02d9a23e6b62bfcf712e7cd2"`);
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_c0eab412e9d37c87d157601c7b7"`);
        await queryRunner.query(`ALTER TABLE "button" DROP CONSTRAINT "FK_fb96e8d5571a89dbce61dcb52fd"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_ca7d1088a45877e520ede2042ed"`);
        await queryRunner.query(`ALTER TABLE "text" ADD CONSTRAINT "FK_f9e02d9a23e6b62bfcf712e7cd2" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_c0eab412e9d37c87d157601c7b7" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "button" ADD CONSTRAINT "FK_fb96e8d5571a89dbce61dcb52fd" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_ca7d1088a45877e520ede2042ed" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
