import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeTables1606690811680 implements MigrationInterface {
    name = 'InitializeTables1606690811680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "expires_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "secrets" ("id" SERIAL NOT NULL, "message" character varying(280) NOT NULL, "status" text NOT NULL, "last_review_request" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4ff48ddba1883d4dc142b9c697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "result" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "secretId" integer, "userId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "secrets_medias_medias" ("secretsId" integer NOT NULL, "mediasId" uuid NOT NULL, CONSTRAINT "PK_135de1660bfd16456ce108126c6" PRIMARY KEY ("secretsId", "mediasId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26c8fb458ddb4f0ca6cd043e90" ON "secrets_medias_medias" ("secretsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3cc152cc6dfbbe29cc716e0bb4" ON "secrets_medias_medias" ("mediasId") `);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_38a3a4b3853a5182fb12835647b" FOREIGN KEY ("secretId") REFERENCES "secrets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "secrets_medias_medias" ADD CONSTRAINT "FK_26c8fb458ddb4f0ca6cd043e90d" FOREIGN KEY ("secretsId") REFERENCES "secrets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "secrets_medias_medias" ADD CONSTRAINT "FK_3cc152cc6dfbbe29cc716e0bb44" FOREIGN KEY ("mediasId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "secrets_medias_medias" DROP CONSTRAINT "FK_3cc152cc6dfbbe29cc716e0bb44"`);
        await queryRunner.query(`ALTER TABLE "secrets_medias_medias" DROP CONSTRAINT "FK_26c8fb458ddb4f0ca6cd043e90d"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_38a3a4b3853a5182fb12835647b"`);
        await queryRunner.query(`DROP INDEX "IDX_3cc152cc6dfbbe29cc716e0bb4"`);
        await queryRunner.query(`DROP INDEX "IDX_26c8fb458ddb4f0ca6cd043e90"`);
        await queryRunner.query(`DROP TABLE "secrets_medias_medias"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "secrets"`);
        await queryRunner.query(`DROP TABLE "medias"`);
    }

}
