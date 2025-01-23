import { createScopedLogger } from "@moccona/logger";

import { Provider } from "~/base/Provider";

const Logger = createScopedLogger("DocManager");

// 定义文档类型的接口
interface Document {
  id: string;
  content: any;
}

export class DocManager<T extends Document = Document> {
  private cache: Map<string, T>; // 缓存已加载的文档
  private provider: Provider; // 提供者实例，用于访问远程资源

  constructor(provider: Provider) {
    this.provider = provider;
    this.cache = new Map();
    this.init();
  }

  /**
   * 初始化方法
   */
  protected init(): void {
    // 初始化逻辑，例如加载预定义的文档或配置
    Logger.info("DocManager initialized");
  }

  /**
   * 从远程源加载文档
   * @param docId 文档的唯一标识符
   * @returns Promise<T> - 加载后的文档对象
   */
  public async loadDocument(docId: string): Promise<T> {
    if (this.cache.has(docId)) {
      // 如果文档已经在缓存中，直接返回
      Logger.debug(`Returning cached document with id ${docId}`);
      return this.cache.get(docId)!;
    }

    try {
      // 从远程源加载文档
      const response = await fetch(this.provider.getDocumentUrl(docId));
      if (!response.ok) {
        throw new Error(
          `Failed to load document ${docId}: ${response.statusText}`,
        );
      }

      const data = await response.json();
      const doc: T = { id: docId, content: data };

      // 将文档存入缓存
      this.cache.set(docId, doc);
      Logger.info(`Document ${docId} loaded and cached successfully`);

      return doc;
    } catch (error) {
      Logger.error(`Failed to load document ${docId}:`, error);
      throw new Error(`Document loading failed: ${(error as Error).message}`);
    }
  }

  /**
   * 检查文档是否已经在缓存中
   * @param docId 文档的唯一标识符
   * @returns boolean - 是否存在
   */
  public hasCachedDocument(docId: string): boolean {
    return this.cache.has(docId);
  }

  /**
   * 获取所有缓存的文档ID列表
   * @returns Array<string> - 缓存的文档ID列表
   */
  public getCachedDocumentIds(): string[] {
    return [...this.cache.keys()];
  }

  /**
   * 清除单个或所有缓存的文档
   * @param docId 可选，指定要清除的文档ID
   */
  public clearCache(docId?: string): void {
    if (docId && this.cache.has(docId)) {
      this.cache.delete(docId);
      Logger.info(`Document ${docId} removed from cache`);
    } else {
      this.cache.clear();
      Logger.info("All documents cleared from cache");
    }
  }

  /**
   * 刷新指定文档的缓存，重新从远程源加载
   * @param docId 文档的唯一标识符
   * @returns Promise<T> - 更新后的文档对象
   */
  public async refreshDocument(docId: string): Promise<T> {
    // 首先清除缓存中的旧数据
    this.clearCache(docId);
    return await this.loadDocument(docId);
  }
}
