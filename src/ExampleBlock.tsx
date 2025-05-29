import { type FC, useState, useEffect } from 'react';

// ExampleBlock コンポーネントのProps型
type ExampleBlockProps = {
  code: string;
  execFunction: () => string;
}

const ExampleBlock: FC<ExampleBlockProps> = ({ code, execFunction }) => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // コンポーネントがマウントされた時、またはpropが変更された時に実行
    try {
      if (typeof Temporal === 'undefined') {
        throw new Error("Temporal APIが有効化されていません。\nFirefox 137以降を使ってください");
      }
      const executionResult = execFunction();
      setResult(executionResult);
      setError(null);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`エラー: ${errorMessage}`);
      setResult(''); // エラー時は結果をクリア
    }
  }, [code, execFunction]); // codeまたはexecFunctionが変更されたら再実行

  return (
    <div className="example-block">
      <div className="code-display">
        <pre><code>{code}</code></pre>
      </div>
      <div className="result-display">
        <pre className={error ? 'error-result' : ''}>
          {error ? error : result}
        </pre>
      </div>
    </div>
  );
};

export default ExampleBlock;
