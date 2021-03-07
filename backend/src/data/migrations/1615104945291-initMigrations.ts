import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrations1615104945291 implements MigrationInterface {
  name = 'initMigrations1615104945291'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "top" integer NOT NULL, "left" integer NOT NULL, "appId" uuid NOT NULL, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user_organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "user_organization_role_enum" NOT NULL, "status" "user_organization_status_enum" NOT NULL, "userId" uuid NOT NULL, "organizationId" uuid NOT NULL, CONSTRAINT "PK_3e103cdf85b7d6cb620b4db0f0c" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "currentOrganizationId" uuid NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "trigger" ("queryId" uuid NOT NULL, "triggerQueryId" uuid NOT NULL, "success" boolean NOT NULL, CONSTRAINT "PK_46032eeecba2873b949bdc5b777" PRIMARY KEY ("queryId", "triggerQueryId"))`);
    await queryRunner.query(`CREATE TABLE "query" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "runAutomatically" boolean NOT NULL, "code" character varying NOT NULL, "showConfirm" boolean NOT NULL, "appId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_be23114e9d505264e2fdd227537" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" "resource_type_enum" NOT NULL, "host" character varying NOT NULL, "port" integer NOT NULL, "dbName" character varying NOT NULL, "dbUserName" character varying NOT NULL, "dbPassword" character varying NOT NULL, "organizationId" uuid NOT NULL, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "createdByUserId" uuid NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "app" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "organizationId" uuid NOT NULL, "updatedByUserId" uuid NOT NULL, CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_bf0b2ac51f4c505642bb829324c" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user_organization" ADD CONSTRAINT "FK_29c3c8cc3ea9db22e4a347f4b5a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user_organization" ADD CONSTRAINT "FK_7143f31467178a6164a42426c15" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6fbb9b480b4b132692fac2b13e2" FOREIGN KEY ("currentOrganizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "FK_57c028bc1e5a97e523642977037" FOREIGN KEY ("queryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "FK_6d509a1b1f977ec40c372ab2375" FOREIGN KEY ("triggerQueryId") REFERENCES "query"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_3a9a94c684f072eb056828e101b" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_b2c552cfab2bee7751868239fec" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "FK_38055c94b44a5367494bb6e0e32" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_c9b171391d920c279fae8a1bf26" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "app" ADD CONSTRAINT "FK_7b9c9502e0197c9a959877f71d9" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "app" ADD CONSTRAINT "FK_da92f797d7577d8f28e5a317bbc" FOREIGN KEY ("updatedByUserId") REFERENCES "user_organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app" DROP CONSTRAINT "FK_da92f797d7577d8f28e5a317bbc"`);
    await queryRunner.query(`ALTER TABLE "app" DROP CONSTRAINT "FK_7b9c9502e0197c9a959877f71d9"`);
    await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_c9b171391d920c279fae8a1bf26"`);
    await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_38055c94b44a5367494bb6e0e32"`);
    await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_b2c552cfab2bee7751868239fec"`);
    await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_3a9a94c684f072eb056828e101b"`);
    await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "FK_6d509a1b1f977ec40c372ab2375"`);
    await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "FK_57c028bc1e5a97e523642977037"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6fbb9b480b4b132692fac2b13e2"`);
    await queryRunner.query(`ALTER TABLE "user_organization" DROP CONSTRAINT "FK_7143f31467178a6164a42426c15"`);
    await queryRunner.query(`ALTER TABLE "user_organization" DROP CONSTRAINT "FK_29c3c8cc3ea9db22e4a347f4b5a"`);
    await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_bf0b2ac51f4c505642bb829324c"`);
    await queryRunner.query(`DROP TABLE "app"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "resource"`);
    await queryRunner.query(`DROP TABLE "query"`);
    await queryRunner.query(`DROP TABLE "trigger"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_organization"`);
    await queryRunner.query(`DROP TABLE "component"`);
  }

}
