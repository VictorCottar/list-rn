import { useSQLiteContext } from "expo-sqlite";

export type User = {
  username: string;
  password: string;
}

export function useRegisterUser() {
  const database = useSQLiteContext();

  async function register(user: User) {
    const statement = await database.prepareAsync(
      "INSERT INTO Users (username, password) VALUES ($username, $password)"
    )

    try {
      const result = await statement.executeAsync({
        $username: user.username,
        $password: user.password,
      });
      return {username: user.username};
    } catch (error) {
      throw error;
    }
  }

  return { register }
}

export function useLoginUser() {
  const database = useSQLiteContext();
  async function login(user: User) {
    try {
      const firstRow = await database.getFirstAsync(
        "SELECT * FROM Users WHERE username = ? AND password = ?",
        [user.username, user.password]
      );
      
      if (firstRow) {
        return firstRow;
      } else {
        throw new Error('Usuário ou senha incorretos');
      }
    } catch (error) {
      throw error;
    }
  }
  return { login };
}