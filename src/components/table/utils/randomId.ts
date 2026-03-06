import ShortUniqueId from "short-unique-id";
const { randomUUID } = new ShortUniqueId();
const randomId = () => {
    return randomUUID();
};

export { randomId };
