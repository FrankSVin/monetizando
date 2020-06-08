/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import model.Computador;
import dao.Banco;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Brino
 */
public class SelectMonetizando {

	private static int ID_ATM = -1;

	public int getIdComputador() {
		if (ID_ATM == -1) {
			ID_ATM = this.getIdComputadorSelect();
		}
		return ID_ATM;
	}

	private int getIdComputadorSelect() {
		String SQL = "SELECT * FROM TBD_ATM WHERE MAC_ADDRESS_INICIAL = ?";
		Connection cnx = new Banco().getInstance();
		Computador computador = new Computador();
		try {

			cnx.setAutoCommit(true);
			PreparedStatement ps = cnx.prepareStatement(SQL);
			ps.setString(1, computador.getRede().getMacParaCadastroInicial());

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				return rs.getInt("ID_ATM");

			}

		} catch (SQLException sqlEx) {
			System.out.print("ERRO SQL0003: ");
			try {
				if (!cnx.isClosed()) {
					cnx.rollback();
				}

				sqlEx.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			System.err.print("ERRO DESC0001: ");
			e.getMessage();
		} finally {
			try {

				if (!cnx.isClosed()) {

					cnx.close();

				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block

				e.printStackTrace();
			}
		}

		return -1;
	}

}
