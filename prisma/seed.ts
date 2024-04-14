import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { randProductCategory } from "@ngneat/falso";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const seedPassword = process.env.STAFF_SEED_PASSWORD!;

const main = async () => {
    console.log("Started seeding ...");
    console.log("Cleaning shop ...");
    await prisma.shop.deleteMany();
    console.log("Cleaning sale invoice ...");
    await prisma.saleInvoice.deleteMany();
    console.log("Cleaning product ...");
    await prisma.product.deleteMany();
    console.log("Cleaning product category ...");
    await prisma.productCategory.deleteMany();
    console.log("Cleaning staff ...");
    await prisma.staff.deleteMany();
    console.log("Cleaning customer ...");
    await prisma.customer.deleteMany();

    console.log("Seeding shops ...");
    await prisma.shop.create({
        data: {
            shopName: faker.commerce.department(),
            shopCode: "shop1",
            mobileNo: faker.phone.number(),
            address: faker.location.streetAddress({ useFullAddress: true }),
        },
    });

    console.log("Seeding staffs ...");
    const staffs: Prisma.StaffCreateInput[] = [];
    const staffNames: string[] = [];
    for (let i = 0; i < 5; i++) {
        let name = faker.person.fullName();
        while (staffNames.includes(name)) {
            name = faker.person.fullName();
        }
        staffNames.push(name);
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(seedPassword, salt);
        staffs.push({
            staffCode: "s" + i.toString().padStart(2, "0"),
            staffName: name,
            dateOfBirth: faker.date.birthdate({ min: 18, max: 40, mode: "age" }),
            gender: "male",
            address: faker.location.streetAddress({ useFullAddress: true }),
            mobileNo: faker.phone.number(),
            password: hashed_password,
        });
    }
    await prisma.staff.createMany({ data: staffs });

    console.log("Seeding product categories ...");
    const categories: Prisma.ProductCategoryCreateInput[] = [];
    const categoryNames: string[] = [];
    for (let i = 0; i < 15; i++) {
        let name = randProductCategory();
        while (categoryNames.includes(name)) {
            name = randProductCategory();
        }
        categoryNames.push(name);
        categories.push({
            productCategoryCode: "c" + i.toString().padStart(2, "0"),
            productCategoryName: name,
        });
    }
    await prisma.productCategory.createMany({ data: categories });

    console.log("Seeding products ...");
    const products: Prisma.ProductCreateManyInput[] = [];
    const productNames: string[] = [];
    for (let i = 0; i < 100; i++) {
        let name = faker.commerce.productName();
        while (productNames.includes(name)) {
            name = faker.commerce.productName();
        }
        productNames.push(name);
        products.push({
            productCode: "p" + i.toString().padStart(4, "0"),
            productName: name,
            price: Number(faker.commerce.price({ min: 100, max: 200 })),
            categoryCode: "c" + faker.number.int({ min: 0, max: 14 }).toString().padStart(2, "0"),
        });
    }
    await prisma.product.createMany({ data: products });

    console.log("Seeding sale invoices ...");
    const saleInvoices: Prisma.SaleInvoiceCreateManyInput[] = [];
    const saleInvoiceDetails: Prisma.SaleInvoiceDetailsCreateManyInput[] = [];
    for (let i = 0; i < 10; i++) {
        const staffCode = "s00";
        const voucherNo = "v" + i.toString().padStart(4, "0");
        const dateTime = faker.date.between({
            from: "2024-01-01T00:00:00.000Z",
            to: new Date().toISOString(),
        });

        const tax = 0.05;
        let totalAmount = 0;

        for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
            const product =
                products.find(
                    (p) =>
                        p.productCode ===
                        "p" + faker.number.int({ min: 0, max: 99 }).toString().padStart(4, "0"),
                ) || products[0];
            const quantity = faker.number.int({ min: 1, max: 5 });
            totalAmount += product.price * quantity;

            saleInvoiceDetails.push({
                voucherNo,
                productCode: product.productCode,
                price: product.price,
                quantity,
                amount: product.price * quantity,
            });
        }

        const taxAmount = totalAmount * tax;
        const paymentAmount = totalAmount + taxAmount;

        saleInvoices.push({
            voucherNo,
            dateTime,
            staffCode,
            totalAmount,
            paymentAmount,
        });
    }
    await prisma.saleInvoice.createMany({ data: saleInvoices });
    await prisma.saleInvoiceDetails.createMany({ data: saleInvoiceDetails });
    console.log("Seeding customers ...");
    const customers: Prisma.CustomerCreateInput[] = [];
    const customerNames: string[] = [];
    for (let i = 0; i < 10; i++) {
        let name = faker.person.fullName();
        while (customerNames.includes(name)) {
            name = faker.person.fullName();
        }
        customerNames.push(name);
        customers.push({
            cusotmerCode: "cus" + i.toString().padStart(2, "0"),
            customerName: name,
            customerDOB: faker.date.birthdate(),
            customerGender: "male",
            cusotmerStateCode: parseInt(faker.location.zipCode()),
            customerTownShipCode: parseInt(faker.address.zipCode()),
            customerMobilNo: faker.phone.number(),
        });
    }
    await prisma.customer.createMany({ data: customers });
    console.log("Finished seeding.");
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
