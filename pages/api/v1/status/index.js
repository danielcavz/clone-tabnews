function status(request, response) {
  response.status(200).json({ chave: "isso é delicinha" });
}

export default status;
