import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSecretsAndSecretStatusTables1605409365086 implements MigrationInterface {
    name = 'CreateSecretsAndSecretStatusTables1605409365086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "secrets" ("id" SERIAL NOT NULL, "message" character varying(280) NOT NULL, "image_url" character varying, "status" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d4ff48ddba1883d4dc142b9c697" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "secrets"`);
    }

}
