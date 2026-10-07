import { describe, expect, test } from "vitest";
import { canTransition, nextStatuses, type OrderStatus } from "@/lib/orders";

describe("order status transitions", () => {
  test.each([
    ["pending", "preparing"],
    ["pending", "cancelled"],
    ["preparing", "ready"],
    ["preparing", "cancelled"],
    ["ready", "delivered"],
  ] as [OrderStatus, OrderStatus][])("%s allows %s", (current, target) => {
    expect(nextStatuses(current)).toContain(target);
    expect(canTransition(current, target)).toBe(true);
  });

  test.each([
    ["delivered", "pending"],
    ["delivered", "preparing"],
    ["delivered", "ready"],
    ["delivered", "cancelled"],
    ["ready", "cancelled"],
    ["cancelled", "pending"],
    ["cancelled", "preparing"],
  ] as [OrderStatus, OrderStatus][])("%s rejects %s", (current, target) => {
    expect(canTransition(current, target)).toBe(false);
  });

  test("final statuses have no next status", () => {
    expect(nextStatuses("delivered")).toEqual([]);
    expect(nextStatuses("cancelled")).toEqual([]);
  });
});
