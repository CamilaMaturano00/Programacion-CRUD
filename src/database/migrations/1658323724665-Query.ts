import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Query1658323724665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "querys",
                columns: [
                    {
                        name: "idQuery",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "queryname",
                        type: "varchar"
                    },
                    {
                        name: "patientId",
                        type: "varchar"
                    },
                    {
                        name: "datequery",
                        type: "varchar"
                    },
                    {
                        name: "reason",
                        type: "varchar"
                    },
                    {
                        name: "diagnosis",
                        type: "varchar",
                      
                    },
                    

                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("querys");
    }
}
