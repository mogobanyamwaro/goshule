import * as bcrypt from 'bcrypt';
export class HashHelper {
  private static salt: string = bcrypt.genSaltSync(10);

  public static async encrypy(password: string): Promise<string> {
    return await bcrypt.hash(password, HashHelper.salt);
  }

  /**
   *
   * @param { string } plain
   * @param { string } hash
   * @returns
   */
  public static async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
