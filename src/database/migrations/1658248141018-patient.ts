import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class patient1658248141018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "patient",
                columns:[
                    {
                        name: "idPatient",
                        type: "uuid",
                        isPrimary: true
                    },                    
                    {
                        name: "patientname",
                        type: "varchar"
                    },
                    {
                        name: "datebirth",
                        type: "varchar"
                    },
                    {
                        name: "weigth",
                        type: "varchar"
                    },
                    {
                        name: "heigth",
                        type: "varchar"
                    },
                    {
                        name: "specie",
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
        )     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("patient");
    
    }

}
