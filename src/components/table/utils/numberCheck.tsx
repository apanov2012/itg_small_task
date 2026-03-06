export default function NumberCheck(
    data: number | string | undefined
): boolean {
    return Number.isInteger(data) ? true : false;
}
