import { useCallback, useState } from "react";
import { client } from "../utils/trpc";
import { faker } from "@faker-js/faker";

type UserListParams = Parameters<(typeof client)["users.list"]["query"]>["0"];
type UserListResp = Awaited<ReturnType<(typeof client)["users.list"]["query"]>>;
type UserFindParams = Parameters<(typeof client)["users.find"]["query"]>["0"];

const useUserTrpc = () => {
  const [listResp, setListResp] = useState<UserListResp>({
    ok: true,
    result: { data: [], page: { limit: 10, offset: 0, page: 1, total: 0 } },
  });

  const createUser = useCallback(async () => {
    const createRes = await client["users.create"].mutate({
      body: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
      },
      headers: null,
      params: null,
      query: null,
    });

    console.log(createRes);

    if (!createRes.ok) return;

    setListResp((prev) => {
      if (!prev.ok) return prev;

      return {
        ...prev,
        result: {
          ...prev.result,
          data: [...prev.result.data, createRes.result],
          page: {
            ...prev.result.page,
            total: prev.result.page.total + 1,
          },
        },
      };
    });
  }, []);

  const listUsers = useCallback(
    async (args: Pick<UserListParams, "headers" | "query">) => {
      const listRes = await client["users.list"].query({
        body: null,
        params: null,
        ...args,
      });

      if (!listRes.ok) return;

      setListResp(listRes);
    },
    [],
  );

  const findUser = useCallback(
    async (args: Pick<UserFindParams, "headers" | "params">) => {
      const findRes = await client["users.find"].query({
        body: null,
        query: null,
        ...args,
      });

      return findRes;
    },
    [],
  );

  return {
    createUser,
    listUsers,
    findUser,
    users: listResp,
  };
};

export default useUserTrpc;
