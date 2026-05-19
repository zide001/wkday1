type ConfigWarningsProps = {
  errors: string[];
};

export function ConfigWarnings({ errors }: ConfigWarningsProps) {
  if (errors.length === 0) return null;

  return (
    <section className="config-warnings" aria-label="配置提醒">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </section>
  );
}
