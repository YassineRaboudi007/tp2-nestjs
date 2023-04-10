import { MigrationInterface, QueryRunner } from "typeorm";

export class First1681054734750 implements MigrationInterface {
    name = 'First1681054734750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(50) NOT NULL, \`Desc\` varchar(255) NOT NULL, \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`UpdatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`DeleatedAt\` datetime(6) NULL, \`status\` enum ('En cours', 'En attente', 'Finalisé') NOT NULL DEFAULT 'En attente', UNIQUE INDEX \`IDX_6a2150d49a03bd35c4fa2d1b6e\` (\`Name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6a2150d49a03bd35c4fa2d1b6e\` ON \`Todo\``);
        await queryRunner.query(`DROP TABLE \`Todo\``);
    }

}
