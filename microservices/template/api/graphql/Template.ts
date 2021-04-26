import {
  extendInputType,
  extendType,
  intArg,
  nonNull,
  objectType,
} from "nexus";

export const Template = objectType({
  name: "Template", // <- Name of your type

  definition(t) {
    t.int("id"); // <- Field named `id` of type `Int`
    t.string("title"); // <- Field named `title` of type `String`
    t.string("body"); // <- Field named `body` of type `String`
    t.boolean("published"); // <- Field named `published` of type `Boolean`
  },
});

export const TemplateQuery = extendType({
  type: "Query",

  definition(t) {
    t.nonNull.list.field("templates", {
      type: "Template",
      resolve(_root, args, ctx) {
        return ctx.db.template.findMany()
      },
    });
  },
});

export const TemplateMutation = extendType({
  type: "Mutation",

  definition(t) {
    t.nonNull.field("createTemplate", {
      type: "Template",
      args: {
        data: nonNull("CreateTemplateInput"),
      },
      resolve(_root, { data: { title, body } }, ctx) {
        const template = {
          title,
          body,
          published: false,
        };

        return ctx.db.template.create({data: template})
      },
    });
    t.field("publishTemplate", {
      type: "Template",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.template.update({
          where: { id: args.id },
          data: {
            published: true
          }
        })
      },
    });
  },
});

export const CreateTemplateInput = extendInputType({
  type: "CreateTemplateInput",

  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("body");
  },
});
