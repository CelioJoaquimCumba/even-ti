export enum errorMessages {
  eventNotFound = 'Evento não encontrado',
  eventNotAvailable = 'Evento não disponível',
  eventNotReserved = 'Nao foi possivel cancelar a reserva',
  eventNotCreated = 'Nao foi possivel criar o evento',
  eventNotUpdated = 'Nao foi possivel atualizar o evento',
  eventNotDeleted = 'Nao foi possivel deletar o evento',
  userNotCreated = 'Nao foi possivel criar o usuario',
  userNotUpdated = 'Nao foi possivel atualizar o usuario',
  userNotDeleted = 'Nao foi possivel deletar o usuario',
  userNotAuthenticated = 'Nao foi possivel autenticar o usuario',
  userNotFound = 'Nao foi possivel encontrar o usuario',
  userNotReservedEvent = 'Nao foi possivel cancelar a reserva do evento',
  userAlreadyReservedEvent = 'O evento já foi reservado por este usuario',
  internalServerError = 'Algo de errado não está certo',
  missingRequiredFields = 'Faltam campos obrigatórios',
  reservationNotFound = 'Nao foi possivel encontrar a reserva',
}

export enum editProfileValidationMessages {
  invalid_phoneNumber = 'Formato de número de telefone inválido. Verifique se incluiu o código do país e que o número contém apenas dígitos.',
  required = 'Este campo é obrigatório',
}
export enum createCommunityValidationMessages {
  required = 'Este campo é obrigatório',
  site = 'O endereço do site deve ser um link',
}
