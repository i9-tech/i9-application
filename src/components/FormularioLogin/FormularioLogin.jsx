import React from 'react'

export default function FormularioLogin() {
  return (
    <forms className='login-forms'>
        <div className='login-input'>
        <p>Usuario</p>
        <input type="text" />
        <span></span>
        </div>
        <div className='login-input'>
        <p>Senha</p>
        <input type="password" />
        <span></span>
        </div>
        <div className='login-entrar'>
        <button>Entrar</button>
        <p><hov>Você esqueceu a senha?</hov></p>
        </div>
    </forms>
  )
}
