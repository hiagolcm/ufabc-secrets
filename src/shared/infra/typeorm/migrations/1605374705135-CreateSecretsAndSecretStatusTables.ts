import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSecretsAndSecretStatusTables1605374705135 implements MigrationInterface {
    name = 'CreateSecretsAndSecretStatusTables1605374705135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "secrets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d4ff48ddba1883d4dc142b9c697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "image_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "status_id" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_b6753d3ca0c7b7f9473b6728ee" ON "secrets" ("status_id") `);
        await queryRunner.query(`ALTER TABLE "secrets" ADD CONSTRAINT "FK_b6753d3ca0c7b7f9473b6728ee3" FOREIGN KEY ("status_id") REFERENCES "secrets"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "secrets" DROP CONSTRAINT "FK_b6753d3ca0c7b7f9473b6728ee3"`);
        await queryRunner.query(`DROP INDEX "IDX_b6753d3ca0c7b7f9473b6728ee"`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "secrets" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "secrets" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "secrets"`);
    }

}
