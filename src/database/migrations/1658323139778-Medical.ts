import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Medical1658323139778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "medicals",
                columns: [
                    {
                        name: "idMedical",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "medicalname",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "Phone",
                        type: "varchar"
                    },
                    {
                        name: "Address",
                        type: "varchar"
                    },
                    {
                        name: "specialty",
                        type: "varchar",
                        
                    },
                    {
                        name: "datebirth",
                        type: "Date"
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
        await queryRunner.dropTable("medicals");
    }

}
