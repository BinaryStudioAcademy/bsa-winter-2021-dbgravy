import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrations1614956972791 implements MigrationInterface {
    name = 'initMigrations1614956972791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user2_organization_role_enum" AS ENUM('admin', 'developer', 'viewer')`);
        await queryRunner.query(`CREATE TYPE "user2_organization_status_enum" AS ENUM('pending', 'active', 'deactivated')`);
        await queryRunner.query(`CREATE TABLE "user2_organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "user2_organization_role_enum" NOT NULL, "status" "user2_organization_status_enum" NOT NULL, "userId" uuid, "organizationId" character varying, CONSTRAINT "PK_c1c2ff8bbf18d4679e924c9219e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "currentOrganizationId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trigger" ("queryId" uuid NOT NULL, "triggerQueryId" uuid NOT NULL, "success" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46032eeecba2873b949bdc5b777" PRIMARY KEY ("queryId", "triggerQueryId"))`);
        await queryRunner.query(`CREATE TABLE "query" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "runAutomatically" boolean NOT NULL, "code" character varying NOT NULL, "showConfirm" boolean NOT NULL, "appId" uuid, "resourceId" uuid, CONSTRAINT "PK_be23114e9d505264e2fdd227537" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "resource_type_enum" AS ENUM('postgres', 'mongodb')`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "type" "resource_type_enum" NOT NULL, "host" character varying NOT NULL, "port" integer NOT NULL, "dbName" character varying NOT NULL, "dbUserName" character varying NOT NULL, "dbPassword" character varying NOT NULL, "organizationId" character varying, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdBy" uuid, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "tpo" integer NOT NULL, "left" integer NOT NULL, "appId" uuid, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "organizationId" character varying, "updatedByUserId" uuid, CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user2_organization" ADD CONSTRAINT "FK_08a1551015518cc31ffdb0c8628" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user2_organization" ADD CONSTRAINT "FK_cc0c8978ecd306d82a0dd4220db" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6fbb9b480b4b132692fac2b13e2" FOREIGN KEY ("currentOrganizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "FK_57c028bc1e5a97e523642977037" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "FK_6d509a1b1f977ec40c372ab2375" FOREIGN KEY ("triggerQueryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_3a9a94c684f072eb056828e101b" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_b2c552cfab2bee7751868239fec" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "FK_38055c94b44a5367494bb6e0e32" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_d6e163bd2cfdd79045d0a95d94d" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_bf0b2ac51f4c505642bb829324c" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app" ADD CONSTRAINT "FK_7b9c9502e0197c9a959877f71d9" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "app" ADD CONSTRAINT "FK_da92f797d7577d8f28e5a317bbc" FOREIGN KEY ("updatedByUserId") REFERENCES "user2_organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app" DROP CONSTRAINT "FK_da92f797d7577d8f28e5a317bbc"`);
        await queryRunner.query(`ALTER TABLE "app" DROP CONSTRAINT "FK_7b9c9502e0197c9a959877f71d9"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_bf0b2ac51f4c505642bb829324c"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_d6e163bd2cfdd79045d0a95d94d"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_38055c94b44a5367494bb6e0e32"`);
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_b2c552cfab2bee7751868239fec"`);
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_3a9a94c684f072eb056828e101b"`);
        await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "FK_6d509a1b1f977ec40c372ab2375"`);
        await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "FK_57c028bc1e5a97e523642977037"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6fbb9b480b4b132692fac2b13e2"`);
        await queryRunner.query(`ALTER TABLE "user2_organization" DROP CONSTRAINT "FK_cc0c8978ecd306d82a0dd4220db"`);
        await queryRunner.query(`ALTER TABLE "user2_organization" DROP CONSTRAINT "FK_08a1551015518cc31ffdb0c8628"`);
        await queryRunner.query(`DROP TABLE "app"`);
        await queryRunner.query(`DROP TABLE "component"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TYPE "resource_type_enum"`);
        await queryRunner.query(`DROP TABLE "query"`);
        await queryRunner.query(`DROP TABLE "trigger"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user2_organization"`);
        await queryRunner.query(`DROP TYPE "user2_organization_status_enum"`);
        await queryRunner.query(`DROP TYPE "user2_organization_role_enum"`);
    }

}
