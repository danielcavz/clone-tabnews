import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Clone TabNews Status</h1>
      <p>É o que tem pra hoje: 🤣</p>
      <UpdatedAt />
      <DatabaseVersion />
      <DatabaseMaxConnections />
      <DatabaseOpenedConnections />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dataBaseVersionText = "Carregando...";
  //console.log(data.dependencies.database.version);

  if (!isLoading && data) {
    dataBaseVersionText = data.dependencies.database.version;
  }

  return <div>Versão do Banco de Dados: {dataBaseVersionText}</div>;
}

function DatabaseMaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseMaxConnections = "Carregando...";

  if (!isLoading && data) {
    databaseMaxConnections = data.dependencies.database.max_connections;
  }

  return (
    <div>Máximo de conexões do Banco de Dados: {databaseMaxConnections}</div>
  );
}

function DatabaseOpenedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseOpenedConnections = "Carregando...";

  if (!isLoading && data) {
    databaseOpenedConnections = data.dependencies.database.opened_connections;
  }

  return <div>Conexões Abertas: {databaseOpenedConnections}</div>;
}
